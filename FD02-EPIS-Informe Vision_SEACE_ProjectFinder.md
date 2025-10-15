# Proyecto SEACE ProjectFinder - Documento de Visión

## 1. Introducción
El presente documento describe la visión del proyecto denominado **Sistema de Inteligencia de Negocios SEACE**, una iniciativa que busca recopilar, organizar y analizar de manera eficiente la información proveniente del Sistema Electrónico de Contrataciones del Estado (SEACE).  
Actualmente, la consulta de datos en dicha plataforma resulta compleja y poco amigable para el usuario promedio, debido a grandes volúmenes de registros, formatos dispersos y limitadas opciones de búsqueda.  
Este proyecto propone una plataforma de inteligencia de negocios que centralice datos de licitaciones, proveedores y contratos, los clasifique y brinde herramientas de consulta y visualización.

## 1.1 Propósito
Establecer objetivos, alcances y lineamientos del proyecto de inteligencia de negocios basado en datos del SEACE.  
La plataforma permitirá búsquedas avanzadas por filtros (categoría, proveedor, monto, procedimiento, ubicación, fecha), generando visualizaciones dinámicas mediante gráficos, tablas y reportes exportables.  
El proyecto tiene un carácter dual: **académico y práctico**.

## 1.2 Alcance
En la primera fase (MVP), el sistema integrará datos del SEACE, los organizará y permitirá su exploración mediante filtros y reportes básicos.  
Incluye:
- Recolección y limpieza de datos de licitaciones.  
- Clasificación por categorías predefinidas.  
- Buscador con filtros.  
- Dashboards dinámicos con indicadores clave.  
- Exportación en PDF y Excel.  

Excluye inicialmente: integración en tiempo real con SEACE, validación legal, firma digital, auditoría certificada.

## 1.3 Referencias
Este documento se basa en prácticas de desarrollo ágil y experiencias previas en proyectos de gestión digital.

## 1.4 Visión General
Consolidar una plataforma de inteligencia de negocios que transforme la forma en que se analizan las contrataciones públicas en Perú, simplificando acceso y generando valor para empresas, investigadores y estudiantes.

---

## 2. Posicionamiento

### 2.1 Oportunidad de negocio
Existe una creciente necesidad de transformar datos abiertos del Estado en información estratégica.  
La plataforma permitirá a empresarios detectar oportunidades de negocio y a investigadores acceder a datos categorizados.

### 2.2 Definición del problema
El SEACE actual presenta limitaciones: interfaces poco intuitivas, grandes volúmenes de datos sin filtros avanzados y reportes estáticos.  
Esto genera pérdida de tiempo, baja eficiencia y limita el análisis de tendencias.

### 2.3 Propuesta de valor (MVP futuro)
- **Simplificación del acceso:** categorías y búsquedas personalizadas.  
- **Generación de conocimiento estratégico:** dashboards y reportes exportables.  
- **Aporte dual académico y empresarial.**

### 2.4 Indicadores de resultado (para la demo)
- Accesibilidad (información en <5 minutos).  
- Usabilidad (satisfacción de usuarios).  
- Cobertura de datos (categorías implementadas).  
- Generación de reportes y dashboards.  
- Impacto académico y empresarial.

---

## 3. Interesados y Usuarios

### 3.1 Resumen de interesados
- **Empresarios y proveedores:** identificar rápidamente oportunidades.  
- **Estudiantes y docentes:** aplicar conceptos de BI y análisis de datos.  
- **Investigadores y analistas:** acceder a datos estructurados para estudios.  
- **Ciudadanos/observadores:** transparencia y monitoreo.  

### 3.5 Perfiles de usuarios (MVP)
- **Usuario Empresarial:** filtros rápidos por categoría, monto, ubicación.  
- **Usuario Académico:** reportes y dashboards comparativos.  
- **Usuario Investigador:** exportaciones y análisis de tendencias.  
- **Usuario Observador:** reportes simples y visuales.  

### 3.6 Necesidades y cobertura
- **RSU/Proyección:** evidencia de viabilidad técnica → demo end-to-end.  
- **Docentes:** alineación con resultados de aprendizaje.  
- **Estudiantes:** uso sencillo y rápido.  

### 3.7 Matriz RACI (MVP)
Define responsables (R), aprobadores (A), consultados (C) e informados (I) para actividades de demo, diseño y pruebas.

---

## 4. Vista general del producto

En la primera fase (MVP) será una plataforma web responsiva, con almacenamiento local/cache y datos de prueba.  
Procesos clave validados: búsqueda, filtrado, exportación, usabilidad.

### 4.1 Resumen de capacidades
Incluye:
- Búsqueda básica por categorías.  
- Filtrado por fecha, entidad, monto.  
- Visualización tabular.  
- Exportación a Excel y PDF.  
- Interfaz amigable con mensajes claros.  

Planeado para fases futuras: dashboards interactivos, integración con SEACE oficial, backend en la nube, roles de usuario, aplicación móvil.

### 4.2 Suposiciones y dependencias
- Requiere internet.  
- Datos oficiales accesibles.  
- Stack técnico: React/Flutter Web, Node.js, SQL Server/MySQL.  
- Seguridad básica.  

### 4.3 Costos (MVP)
- Generales: S/. 60  
- Operativos: S/. 92  
- Personal: S/. 4229.90  
- **Total: S/. 4381.00**  

### 4.4 Licenciamiento e instalación
Uso académico y demostrativo.  
Instalación en servidor de pruebas, acceso vía navegador.

### 4.5 Características (MVP)
- Interfaz clara y funcional.  
- Exportación de reportes.  
- Seguridad inicial con login básico.  

### 4.6 Restricciones (MVP)
- Solo búsqueda y exportación.  
- Dependencia de internet.  
- Sin dashboards ni multiusuario avanzado aún.  

### 4.7 Rangos de calidad (MVP)
- Satisfacción ≥80%.  
- Tiempo de respuesta <2 s con 10,000 registros.  
- Exportación correcta ≥95%.  
- Tasa de fallos críticos = 0.  

---

## 5. Precedencia y prioridad
- **P0:** login seguro, carga de datos, filtros.  
- **P1:** rapidez (<2 s), exportación.  
- **P2:** dashboards, manual de uso.  
- **P3:** pulido visual e identidad.  

---

## 6. Lineamientos y estándares
- Cumplimiento con **Ley N.° 29733** (protección de datos) y **Ley N.° 30096** (delitos informáticos).  
- Accesibilidad (contraste, tipografía clara).  
- Seguridad: login encriptado, sesiones con cierre automático.  
- Calidad: pruebas funcionales, control de versiones, ISO 9001 / ISO 27001.  

---

## 7. Otros requerimientos
- Entorno web, navegadores modernos.  
- Datos cargados localmente o desde fuentes públicas.  
- Compatibilidad con MySQL o SQL Server.  
- Limitaciones: no incluye aún integración en tiempo real ni analítica predictiva.  

---

## Conclusiones
El prototipo del sistema SEACE Inteligente demuestra una solución práctica y escalable para recopilar, organizar y filtrar información de contrataciones públicas.  
Su equilibrio entre simplicidad y funcionalidad sienta bases sólidas para evoluciones posteriores hacia analítica predictiva y dashboards interactivos.

## Recomendaciones
- Monitoreo de la demo y endurecimiento del login.  
- Entregar guía breve de uso.  
- Recolectar feedback estructurado.  
- Planificar escalamiento progresivo hacia bases de datos y funciones avanzadas.  

## Bibliografía
- Congreso de la República del Perú (2011). Ley N.° 29733.  
- Congreso de la República del Perú (2013). Ley N.° 30096.  
- Google. Flutter Documentation.  
- ISO (2022). ISO/IEC 27001:2022.  
- OWASP Foundation (2021, 2023). OWASP Top 10, MASVS v2.  
- W3C (2023). WCAG 2.2.  
