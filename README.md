
Úvod
Aplikace e-shopu je platforma pro online nakupování, která umožňuje zákazníkům prohlížet, vyhledávat a nakupovat produkty online.

Funkcionality
Registrace uživatele: Noví uživatelé se mohou registrovat poskytnutím potřebných údajů, jako jsou uživatelské jméno, email a heslo.
Autentizace uživatele: Registrovaní uživatelé se mohou bezpečně přihlásit pomocí svých přihlašovacích údajů.
Správa nákupního košíku: Uživatelé mohou přidávat položky do svého nákupního košíku, odebírat položky z košíku a upravovat jejich množství podle potřeby.
Potvrzení objednávky: Uživatelé mohou potvrdit své objednávky poskytnutím dodacích údajů.
Správa profilu: Uživatelé mohou upravovat informace ve svém profilu, včetně uživatelského jména, emailu, hesla a dodací adresy.
Historie objednávek: Uživatelé mohou prohlížet historii svých objednávek, včetně detailů minulých nákupů.

Admin Funkcionality
Administrátor má následující možnosti:

Přidávání a odebírání položek (produkty).
Úprava profilů ostatních uživatelů.
Přidávání nových uživatelů.
Zobrazení všech objednávek.
Mazání objednávek.
Mazání uživatelů.
Tato funkcionalita umožňuje administrátorovi efektivně spravovat e-shop z hlediska produktů, uživatelů a objednávek.

Struktura aplikace
Aplikace je strukturována do backendové a frontendové části:

Backend: Napsán v Java Spring Framework, backend obsahuje balíčky jako controller, service, repository a security. Každý balíček obsahuje třídy odpovědné za specifické funkcionality podle standardních postupů. Backendový server běží na portu 9000.
Frontend: Vyvinut v JavaScriptu pomocí React.js, frontend se nachází v adresáři src/main/js/frontend. Frontendová aplikace je strukturována do balíčků, včetně komponent a služeb. Balíček komponent obsahuje znovupoužitelné UI komponenty, které se používají po celé aplikaci pro konzistentní vzhled a pocit. Balíček služeb slouží jako most mezi frontendem a backendem. Zajišťuje volání API a komunikaci se serverem.
Pro autentizaci a autorizaci jsou využívány JSON Web Tokeny (JWT) k zabezpečení komunikace mezi frontendem a backendem, což zajišťuje bezpečnou autentizaci uživatele a kontrolu přístupu. Frontendový server běží na portu 3000.

