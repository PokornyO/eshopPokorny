package com.example.eshoppokorny;

import com.example.eshoppokorny.entity.AppUser;
import com.example.eshoppokorny.entity.Role;
import com.example.eshoppokorny.mock.WithMockAdmin;
import com.example.eshoppokorny.mock.WithMockUser;
import com.example.eshoppokorny.repository.AppUserRepository;
import com.example.eshoppokorny.repository.RoleRepository;
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
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles("test")
public class AppUserControllerTest {
    @Autowired
    private MockMvc api;

    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    RoleRepository roleRepository;
    @BeforeEach
    void setUp() {
        AppUser appUser = new AppUser();
        appUser.setUsername("user");
        Role role = new Role();
        role.setName("ROLE_USER");
        roleRepository.save(role);
        appUserRepository.save(appUser);
    }
    @AfterEach
    void teardown() {
        appUserRepository.deleteAll();
        roleRepository.deleteAll();
    }
    @Test
    @WithMockAdmin
    void testExistingUserEndpoint() throws Exception {
        AppUser appUser = appUserRepository.findByUsername("user");
        Long id = appUser.getId();
        System.out.println(id);
        api.perform(get("/app-user/{id}", id))
                .andExpect(status().isOk());
    }
    @Test
    @WithMockAdmin
    void testAdminShouldSeeAdminEndpoint() throws Exception {
        api.perform(get("/app-user")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isOk());
    }
    @Test
    @WithMockUser
    void testLoggedInButNotAdminShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/app-user")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isForbidden());
    }

    @Test
    void testNotLoggedInShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/app-user")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isUnauthorized());

    }
    @Test
    void testUserCount() throws Exception {
        long userCount = appUserRepository.count();
        assertEquals(1, userCount);
    }

    @Test
    public void testCreateAppUser() throws Exception {
        Role role = roleRepository.findRoleByName("ROLE_USER");
        long id = role.getId();
        String requestBody = "{\"username\":\"testuser\",\"password\":\"testpassword\",\"email\":\"user@gmail.com\",\"firstName\":\"testfirstname\",\"lastName\":\"testlastname\",\"roleId\":" + id + "}";
        api.perform(post("/app-user")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());

        AppUser savedUser = appUserRepository.findByUsername("testuser");
        assertNotNull(savedUser);
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("user@gmail.com", savedUser.getEmail());
    }


    @Test
    @WithMockAdmin
    public void testDeleteAppUser() throws Exception {
        AppUser testUser = new AppUser();
        testUser.setUsername("deleteUser");
        testUser.setPassword("password");
        testUser.setEmail("delete@example.com");
        appUserRepository.save(testUser);

        api.perform(delete("/app-user/{id}", testUser.getId()))
                .andExpect(status().isNoContent());

        AppUser deletedUser = appUserRepository.findByUsername("deleteUser");
        assertNull(deletedUser);
    }
    @Test
    @WithMockAdmin
    public void testUpdateUser() throws Exception {
        AppUser existingUser = appUserRepository.findByUsername("user");
        Role role = roleRepository.findRoleByName("ROLE_USER");
        long id = role.getId();
        String updatedRequestBody = "{\"username\":\"updateduser\",\"password\":\"updatedpassword\",\"email\":\"updateduser@gmail.com\",\"firstName\":\"updatedfirstname\",\"lastName\":\"updatedlastname\",\"roleId\":" + id + "}";

        api.perform(put("/app-user/{id}", existingUser.getId())
                        .content(updatedRequestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        AppUser updatedUser = appUserRepository.findById(existingUser.getId()).orElse(null);
        assertNotNull(updatedUser);
        assertEquals("updateduser", updatedUser.getUsername());
        assertEquals("updateduser@gmail.com", updatedUser.getEmail());
    }

    @Test
    public void testIsEmailUnique() throws Exception {
        api.perform(get("/app-user/email")
                        .param("email", "user@example.com"))
                .andExpect(status().isOk());
    }

    @Test
    public void testIsUsernameUnique() throws Exception {
        api.perform(get("/app-user/username")
                        .param("username", "user"))
                .andExpect(status().isOk());
    }

}
