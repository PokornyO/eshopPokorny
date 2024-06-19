package com.example.eshoppokorny;

import com.example.eshoppokorny.dto.InputEOrderDtoV1;
import com.example.eshoppokorny.entity.Address;
import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.EOrder;
import com.example.eshoppokorny.entity.Item;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.mock.WithMockAdmin;
import com.example.eshoppokorny.mock.WithMockUser;
import com.example.eshoppokorny.repository.AddressRepository;
import com.example.eshoppokorny.repository.AppUserRepository;
import com.example.eshoppokorny.repository.EOrderRepository;
import com.example.eshoppokorny.repository.ItemRepository;
import com.example.eshoppokorny.repository.RoleRepository;
import com.example.eshoppokorny.service.EOrderServiceV1;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles("test")
public class EOrderControllerTest {

    @Autowired
    private MockMvc api;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EOrderRepository eOrderRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private EOrderServiceV1 eOrderServiceV1;

    @BeforeEach
    void setUp() {
        Role role = new Role();
        role.setName("ROLE_USER");
        roleRepository.save(role);

        AppUser appUser = new AppUser();
        appUser.setUsername("user");
        appUser.setPassword("password");
        appUser.setEmail("user@example.com");
        appUser.setFirstName("UserFirstName");
        appUser.setLastName("UserLastName");
        appUser.getRoles().add(role);
        appUser.setActive(true);
        appUserRepository.save(appUser);

        Address address = new Address();
        address.setStreet("Main St");
        address.setCity("City");
        address.setHouseNumber(1596);
        address.setZipcode(58301);
        addressRepository.save(address);

        Item item = new Item();
        item.setName("Item1");
        item.setInStockCount(10);
        item.setPrice(100.0);
        itemRepository.save(item);
    }

    @AfterEach
    void teardown() {
        appUserRepository.deleteAll();
        eOrderRepository.deleteAll();
        addressRepository.deleteAll();
        roleRepository.deleteAll();
        itemRepository.deleteAll();
    }

    @Test
    @WithMockAdmin
    public void testCreateOrder() throws Exception {
        AppUser appUser = appUserRepository.findByUsername("user");
        Address address = addressRepository.findAll().get(0);
        Item item = itemRepository.findAll().get(0);
        System.out.println(item.getId());
        String requestBody = "{\"userId\":" + appUser.getId() + ",\"addressId\":" + address.getId() + ",\"productInfo\":[{\"itemId\":" + item.getId() + ",\"count\":2}]}";

        api.perform(post("/orders")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());

        EOrder createdOrder = eOrderRepository.findAll().get(0);
        assertNotNull(createdOrder);
        assertEquals(appUser.getId(), createdOrder.getAppUser().getId());
        assertEquals(address.getId(), createdOrder.getAddress().getId());
        assertEquals(item.getPrice()*2, createdOrder.getPrice());
    }

    @Test
    @WithMockAdmin
    public void testFindByUserId() throws Exception {
        AppUser appUser = appUserRepository.findByUsername("user");
        EOrder order = new EOrder();
        order.setAppUser(appUser);
        order.setAddress(addressRepository.findAll().get(0));
        eOrderRepository.save(order);

        api.perform(get("/orders/user/{id}", appUser.getId())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "id")
                        .param("sortOrder", "asc"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockAdmin
    public void testFindById() throws Exception {
        EOrder order = new EOrder();
        order.setAppUser(appUserRepository.findByUsername("user"));
        order.setAddress(addressRepository.findAll().get(0));
        eOrderRepository.save(order);

        api.perform(get("/orders/{id}", order.getId()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockAdmin
    public void testGetAllOrders() throws Exception {
        EOrder order = new EOrder();
        order.setAppUser(appUserRepository.findByUsername("user"));
        order.setAddress(addressRepository.findAll().get(0));
        eOrderRepository.save(order);

        api.perform(get("/orders")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "id")
                        .param("sortOrder", "asc"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockAdmin
    public void testGetOrderCount() throws Exception {
        api.perform(get("/orders/count"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockAdmin
    public void testGetOrderCountByUserId() throws Exception {
        AppUser appUser = appUserRepository.findByUsername("user");
        EOrder order = new EOrder();
        order.setAppUser(appUser);
        order.setAddress(addressRepository.findAll().get(0));
        eOrderRepository.save(order);

        api.perform(get("/orders/count/{id}", appUser.getId()))
                .andExpect(status().isOk());
    }

}
