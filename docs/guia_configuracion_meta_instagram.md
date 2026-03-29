# Guía de Configuración Meta + Instagram para ChicImportUSA
**Objetivo:** Configurar correctamente Facebook Page, Instagram Business y Meta Developer App para habilitar la automatización de publicaciones desde n8n.

**Tiempo estimado:** 2-3 horas  
**Requisito:** Tener acceso a Meta Business Suite y Meta Developers

---

## PARTE 1 — Facebook Page

### Paso 1.1 — Crear la Facebook Page

1. Ve a [facebook.com](https://facebook.com) con tu cuenta personal de Héctor
2. Clic en el menú de la izquierda → **"Páginas"**
3. Clic en **"+ Crear nueva página"**
4. Completa:
   - **Nombre:** ChicImportUSA
   - **Categoría:** Tienda de ropa (o Tienda de artículos deportivos)
   - **Descripción:** Productos importados desde Estados Unidos — Tenis, perfumes, ropa y más
5. Clic en **"Crear página"**

**✅ Validación:** Entra a la página recién creada y verifica que aparece como administrador.

---

### Paso 1.2 — Agregar a Tatiana como administradora

1. Desde tu Facebook Page → clic en **"Configuración de la página"**
2. En el menú izquierdo → **"Nueva estructura de páginas"** → **"Personas"**
3. Clic en **"Agregar"**
4. Busca el perfil de Tatiana Giraldo
5. Asígnale el rol **"Administradora"**
6. Tatiana recibirá una notificación para aceptar

**✅ Validación:** En la lista de personas de la página deben aparecer tanto Héctor como Tatiana con rol Administrador.

---

## PARTE 2 — Instagram Business

### Paso 2.1 — Convertir Instagram a cuenta Business

1. Abre la app de Instagram con la cuenta **@chic_importusa**
2. Ve a tu perfil → menú hamburguesa (☰) → **"Configuración y privacidad"**
3. Clic en **"Tipo de cuenta y herramientas"**
4. Clic en **"Cambiar a cuenta profesional"**
5. Selecciona **"Empresa"** (no Creador)
6. Categoría: **Tienda de ropa** o **Comercio minorista**
7. Completa la información de contacto

**✅ Validación:** En tu perfil de Instagram debe aparecer la categoría debajo del nombre y el botón "Contactar".

---

### Paso 2.2 — Conectar Instagram a la Facebook Page

1. Ve a [business.facebook.com](https://business.facebook.com) (raíz del portafolio)
2. Selecciona el portafolio de ChicImportUSA (o créalo si no existe)
3. En el menú izquierdo → **"Configuración"** → **"Cuentas"** → **"Cuentas de Instagram"**
4. Clic en **"+ Agregar"**
5. Inicia sesión con las credenciales de @chic_importusa
6. Confirma la conexión

**✅ Validación:** La cuenta @chic_importusa debe aparecer listada en "Cuentas de Instagram" dentro del portafolio.

---

### Paso 2.3 — Conectar Instagram a la Facebook Page específica

1. Ve a tu **Facebook Page** de ChicImportUSA
2. Clic en **"Configuración de la página"**
3. En el menú → **"Instagram"**
4. Clic en **"Conectar cuenta"**
5. Inicia sesión con @chic_importusa
6. Confirma la conexión

**✅ Validación:** En la configuración de la Page debe aparecer @chic_importusa como cuenta de Instagram conectada.

---

## PARTE 3 — Meta Business Suite

### Paso 3.1 — Verificar el portafolio de negocio

1. Ve a [business.facebook.com](https://business.facebook.com)
2. Verifica que estás en el portafolio correcto de ChicImportUSA (selector arriba a la izquierda)
3. En **"Configuración"** → **"Información del negocio"** verifica:
   - Nombre del negocio: ChicImportUSA
   - La Facebook Page está agregada
   - La cuenta de Instagram está agregada

**✅ Validación:** Ambas cuentas (Facebook Page e Instagram) deben aparecer en "Cuentas" dentro del portafolio.

---

## PARTE 4 — Meta Developer App

### Paso 4.1 — Crear la aplicación de desarrollador

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Clic en **"Mis apps"** → **"Crear app"**
3. Selecciona el tipo: **"Empresa"** (Business)
4. Completa:
   - **Nombre de la app:** Chicimportusa
   - **Correo de contacto:** hjcuervo@chicimportusa.com
   - **Portafolio de negocio:** selecciona ChicImportUSA
5. Clic en **"Crear app"**

**✅ Validación:** La app aparece en "Mis apps" con un App ID asignado. Anota el App ID — lo necesitarás más adelante.

---

### Paso 4.2 — Agregar el producto Instagram Graph API

1. Dentro de tu app → clic en **"Agregar productos"**
2. Busca **"Instagram Graph API"**
3. Clic en **"Configurar"**

**✅ Validación:** En el menú izquierdo de tu app aparece "Instagram Graph API".

---

### Paso 4.3 — Configurar permisos necesarios

1. En tu app → menú izquierdo → **"Instagram Graph API"** → **"Permisos"**
2. Verifica que estos permisos están disponibles:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_read_engagement`
   - `pages_show_list`
3. Si aparecen en estado **"Listo para la prueba"**, haz clic en **"Agregar"** en cada uno

**✅ Validación:** Los 4 permisos deben aparecer en estado **"Activo"** o **"Agregado"**.

---

### Paso 4.4 — Agregar tester de Instagram

1. En tu app → **"Roles"** → **"Testers de Instagram"**
2. Clic en **"Agregar testers de Instagram"**
3. Ingresa el usuario: **chic_importusa**
4. Envía la invitación

5. Para aceptar la invitación (importante — NO se hace desde la app móvil):
   - Ve a [instagram.com/accounts/manage_access/](https://instagram.com/accounts/manage_access/)
   - Sección **"Invitaciones Para Evaluadores"**
   - Acepta la invitación

**✅ Validación:** En la sección de Testers de Instagram de tu app, @chic_importusa aparece como tester activo.

---

## PARTE 5 — Generar el Token de Acceso

### Paso 5.1 — Generar User Access Token

1. En tu app → **"Herramientas"** → **"Explorador de la API Graph"**
2. En el selector de app (arriba a la derecha) selecciona **"Chicimportusa"**
3. Clic en **"Generar token de acceso de usuario"**
4. Selecciona los permisos:
   - ✅ `instagram_basic`
   - ✅ `instagram_content_publish`
   - ✅ `pages_read_engagement`
   - ✅ `pages_show_list`
5. Clic en **"Generar token"**
6. Autoriza con tu cuenta de Facebook

**✅ Validación:** Aparece un token largo en el campo "Token de acceso". Cópialo.

---

### Paso 5.2 — Obtener el Page Access Token e Instagram Business Account ID

Con el User Access Token generado, consulta en el Explorador de la API Graph:

```
GET /{PAGE_ID}?fields=instagram_business_account,access_token
```

Reemplaza `{PAGE_ID}` con el ID de tu Facebook Page (lo encuentras en Configuración de la Page → "Acerca de esta página").

La respuesta debe incluir:
- `access_token` → este es el **Page Access Token**
- `instagram_business_account.id` → este es el **Instagram Business Account ID**

**Anota ambos valores — los necesitarás para configurar n8n.**

**✅ Validación:** La consulta retorna ambos IDs sin errores.

---

### Paso 5.3 — Convertir a token de larga duración

El token generado dura 60 días. Debes convertirlo a larga duración (nunca expira si se usa regularmente).

En el Explorador de la API Graph consulta:

```
GET /oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &fb_exchange_token={USER_ACCESS_TOKEN}
```

- `{APP_ID}` → el App ID de tu app Chicimportusa
- `{APP_SECRET}` → en tu app → **"Configuración"** → **"Básica"** → "Secreto de la app"
- `{USER_ACCESS_TOKEN}` → el token generado en el paso anterior

La respuesta incluye un nuevo token de larga duración.

**✅ Validación:** El nuevo token tiene `expires_in` muy alto (más de 5 millones de segundos) o no tiene fecha de expiración.

---

## PARTE 6 — Validación Final

Antes de pasar a configurar n8n, verifica esta lista completa:

| Elemento | Estado |
|----------|--------|
| Facebook Page creada | ✅ / ❌ |
| Tatiana como administradora | ✅ / ❌ |
| Instagram convertido a Business | ✅ / ❌ |
| Instagram conectado a Facebook Page | ✅ / ❌ |
| Meta Developer App creada | ✅ / ❌ |
| Instagram Graph API agregado a la app | ✅ / ❌ |
| 4 permisos activos | ✅ / ❌ |
| @chic_importusa como tester activo | ✅ / ❌ |
| Page Access Token generado | ✅ / ❌ |
| Instagram Business Account ID obtenido | ✅ / ❌ |
| Token convertido a larga duración | ✅ / ❌ |

**Solo cuando todos los ítems estén en ✅ proceder con la configuración de n8n.**

---

## ⚠️ Notas Importantes

- **Nunca compartas** el App Secret, el Page Access Token ni el User Access Token en chats, correos o documentos compartidos
- Si accidentalmente compartes un token, revócalo inmediatamente desde Meta Developers → tu app → "Tokens"
- El token de larga duración debe usarse al menos una vez cada 60 días para que no expire
- Ir siempre directo a las URLs específicas en Meta — no navegar por Business Suite desde el inicio ya que carga portafolios incorrectos
- La URL raíz correcta del portafolio es: `business.facebook.com/` (sin parámetros adicionales)

---

*Documento generado para ChicImportUSA — Configuración Meta + Instagram*  
*Marzo 2026 — Uso interno*
