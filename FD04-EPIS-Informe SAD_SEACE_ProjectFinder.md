# [cite_start]UNIVERSIDAD PRIVADA DE TACNA [cite: 292]
## [cite_start]FACULTAD DE INGENIERÍA [cite: 293]
### [cite_start]Escuela Profesional de Ingeniería de Sistemas [cite: 294]

## [cite_start]"Proyecto SEACE ProjectFinder" [cite: 295]

**Curso:**
[cite_start]Inteligencia de Negocios [cite: 297]

**Docente:**
Mag. [cite_start]Patrick Cuadros Quiroga [cite: 299]

**Integrantes:**

| Nombre | Código |
| :--- | :--- |
| Akhtar Oviedo, Ahmed Hasan | (2022074261) |
| Anampa Pancca, David Jordan | (2022074268) |
| Salas Jimenez, Walter Emmanuel | (2022073896) |
[cite_start][cite: 301]

[cite_start]**Tacna - Perú** [cite: 302]
[cite_start]**2025** [cite: 303]

---

### CONTROL DE VERSIONES

| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.0 | AHAO, DJAP, WESJ | ERM | | $09/09/25$ | Versión 1.0 |
[cite_start][cite: 306]

---

## Sistema SEACE ProjectFinder
### [cite_start]Documento de Arquitectura de Software [cite: 307]
[cite_start]**Versión 1.0** [cite: 308]

---

### CONTROL DE VERSIONES

| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.0 | MPV | ELV | ARV | 10/10/2020 | Versión Original |
[cite_start][cite: 312]

---

## [cite_start]INDICE GENERAL [cite: 313]

**1. [cite_start]INTRODUCCIÓN** [cite: 315]
    * 1.1. [cite_start]Propósito (Diagrama 4+1) [cite: 315]
    * 1.2. [cite_start]Alcance [cite: 315]
    * 1.3. [cite_start]Definición, siglas y abreviaturas [cite: 315]
    * 1.4. [cite_start]Organización del documento [cite: 315]
**2. [cite_start]OBJETIVOS Y RESTRICCIONES ARQUITECTONICAS** [cite: 315]
    * 2.1.1. [cite_start]Requerimientos Funcionales [cite: 315]
    * 2.1.2. [cite_start]Requerimientos No Funcionales - Atributos de Calidad [cite: 315]
**3. [cite_start]REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA** [cite: 315]
    * 3.1. [cite_start]Vista de Caso de uso [cite: 315]
        * 3.1.1. [cite_start]Diagramas de Casos de uso [cite: 315]
    * 3.2. [cite_start]Vista Lógica [cite: 315]
        * 3.2.1. [cite_start]Diagrama de Subsistemas (paquetes) [cite: 315]
        * 3.2.2. [cite_start]Diagrama de Secuencia (vista de diseño) [cite: 315]
        * 3.2.3. [cite_start]Diagrama de Colaboración (vista de diseño) [cite: 315]
        * 3.2.4. [cite_start]Diagrama de Objetos [cite: 315]
        * 3.2.5. [cite_start]Diagrama de Clases [cite: 315]
        * 3.2.6. [cite_start]Diagrama de Base de datos (relacional o no relacional) [cite: 315]
    * 3.3. [cite_start]Vista de Implementación (vista de desarrollo) [cite: 315]
        * 3.3.1. [cite_start]Diagrama de arquitectura software (paquetes) [cite: 315]
        * 3.3.2. [cite_start]Diagrama de arquitectura del sistema (Diagrama de componentes) [cite: 315]
    * 3.4. [cite_start]Vista de procesos [cite: 315]
        * 3.4.1. [cite_start]Diagrama de Procesos del sistema (diagrama de actividad) [cite: 315]
    * 3.5. [cite_start]Vista de Despliegue (vista física) [cite: 315]
        * 3.5.1. [cite_start]Diagrama de despliegue [cite: 315]
**4. [cite_start]ATRIBUTOS DE CALIDAD DEL SOFTWARE** [cite: 315]
    * [cite_start]Escenario de Funcionalidad [cite: 315]
    * [cite_start]Escenario de Usabilidad [cite: 315]
    * [cite_start]Escenario de confiabilidad [cite: 315]
    * [cite_start]Escenario de rendimiento [cite: 318]
    * [cite_start]Escenario de mantenibilidad [cite: 318]
    * [cite_start]Otros Escenarios [cite: 318]

---

## [cite_start]1. INTRODUCCIÓN [cite: 322]

[cite_start]El presente Documento de Análisis de Sistema (SAD) describe el proyecto denominado Sistema de Inteligencia de Negocios SEACE, cuyo objetivo principal es analizar, diseñar y definir la arquitectura del sistema que permitirá recopilar, organizar y procesar eficientemente la información proveniente del Sistema Electrónico de Contrataciones del Estado (SEACE). [cite: 324]

[cite_start]Actualmente, la consulta de datos en el SEACE oficial resulta compleja debido al alto volumen de registros, formatos heterogéneos y opciones limitadas de búsqueda, lo que dificulta el análisis detallado de las contrataciones públicas y restringe la identificación de oportunidades de negocio, tendencias del mercado y patrones de inversión estatal. [cite: 325] [cite_start]Frente a esta problemática, el sistema propuesto busca centralizar la información de licitaciones, proveedores y contratos, clasificándola en categorías específicas y ofreciendo herramientas de consulta y visualización avanzadas. [cite: 326] [cite_start]Esto permitirá transformar los datos crudos en información estructurada, clara y útil para la toma de decisiones estratégicas en contextos académicos, empresariales y de gestión pública. [cite: 327]

[cite_start]El Sistema de Inteligencia de Negocios SEACE se plantea como un complemento del SEACE oficial, proporcionando un entorno más accesible y orientado al análisis de datos mediante reportes, dashboards y filtros personalizados, garantizando así una experiencia práctica para estudiantes, investigadores, gestores públicos y empresarios interesados en el estudio de las dinámicas del mercado de adquisiciones estatales. [cite: 328]

---

### 1.1. [cite_start]Propósito (Diagrama 4+1) [cite: 331]

[cite_start]El presente documento describe la arquitectura de software del sistema SEACE ProjectFinder, una plataforma orientada a la extracción, organización, análisis y recomendación de proyectos de software a partir de procesos de contratación pública registrados en SEACE/OSCE. [cite: 333] [cite_start]La visión arquitectónica se basa en el modelo $4+1$ vistas de Kruchten, permitiendo abordar el sistema desde diferentes perspectivas: [cite: 334]

* [cite_start]**Vista de casos de uso:** representación de funcionalidades principales y actores (usuario y administrador). [cite: 335]
* [cite_start]**Vista lógica:** organización del sistema en subsistemas, objetos y clases. [cite: 336]
* [cite_start]**Vista de desarrollo/implementación:** estructura de paquetes, componentes y arquitectura de software. [cite: 337]
* [cite_start]**Vista de procesos:** representación de actividades y flujo de ejecución de procesos ETL y análisis. [cite: 338]
* [cite_start]**Vista física (despliegue):** infraestructura tecnológica para el alojamiento y operación del sistema. [cite: 339]

[cite_start]La arquitectura se diseña priorizando eficiencia y escalabilidad (para procesar grandes volúmenes de datos del SEACE) frente a portabilidad, aunque se mantiene soporte multiplataforma vía tecnologías web (NextJS, FastAPI, PostgreSQL, Power BI). [cite: 340]

---

### 1.2. [cite_start]Alcance [cite: 343]

[cite_start]El sistema SEACE ProjectFinder abarca la construcción de una plataforma de inteligencia de negocios enfocada en la recopilación, organización, análisis y recomendación de proyectos de software a partir de los procesos de contratación pública registrados en el SEACE/OSCE. [cite: 345] [cite_start]Su cobertura funcional considera desde la extracción, transformación y almacenamiento (ETL) de registros públicos, hasta su clasificación automática mediante técnicas de procesamiento de lenguaje natural (NLP), lo que permite categorizar convocatorias en rubros como Ingeniería de Sistemas, Construcción, Salud, Educación, Transporte, entre otros. [cite: 346] [cite_start]A partir de dicha clasificación, el sistema generará ideas de proyectos acompañadas de un Producto Mínimo Viable (MVP) y un Sprint 1 de referencia, con el objetivo de transformar necesidades públicas en oportunidades concretas para los ingenieros de sistemas. [cite: 347] [cite_start]La plataforma también incluirá un motor de búsqueda avanzada que permitirá a los usuarios filtrar procesos por categoría, entidad pública, región, monto, estado, fecha, anexos y nivel de complejidad, con la opción de exportar resultados a formatos PDF y Excel. [cite: 348] [cite_start]De manera complementaria, se integrará un dashboard interactivo en Power BI que presentará estadísticas clave, comparaciones históricas y tendencias, facilitando así el análisis estratégico de oportunidades de proyectos. [cite: 349] [cite_start]La gestión de usuarios permitirá diferenciar entre administradores, encargados de la configuración del sistema, control de accesos y ejecución de procesos ETL, y usuarios finales como ingenieros, investigadores o consultores, quienes accederán a la información y reportes de manera simplificada. [cite: 350]

[cite_start]En términos técnicos, el sistema será implementado bajo una arquitectura en capas compuesta por un frontend en React/NextJS, un backend basado en FastAPI/NodeJS, un módulo ETL especializado en extracción desde SEACE, una base de datos relacional o no relacional (PostgreSQL o MongoDB) y un dashboard conectado en Power BI. [cite: 351] [cite_start]Esta arquitectura modular y escalable permitirá ampliar el alcance en fases futuras, integrando recomendaciones con inteligencia artificial (RAG + embeddings), métricas avanzadas de uso, analítica predictiva y despliegue en infraestructura en la nube. [cite: 352]

---

### 1.3. [cite_start]Definición, siglas y abreviaturas [cite: 355]

[cite_start]En este apartado se presentan las definiciones de los términos, acrónimos y abreviaturas utilizados a lo largo del documento, con el propósito de asegurar una interpretación clara y uniforme. [cite: 357] [cite_start]Los términos incluyen tanto conceptos técnicos como específicos del entorno del sistema. [cite: 358]

* [cite_start]**API (Application Programming Interface):** Conjunto de métodos, protocolos y herramientas que permiten la comunicación entre el frontend, backend y otros servicios del sistema. [cite: 359]
* [cite_start]**BI (Business Intelligence):** Conjunto de técnicas, metodologías y herramientas utilizadas para analizar información y generar conocimiento a través de dashboards y reportes interactivos. [cite: 362]
* [cite_start]**BD (Base de Datos):** Repositorio estructurado donde se almacenan los procesos extraídos del SEACE, así como los usuarios, métricas y resultados procesados. [cite: 363]
* [cite_start]**Caso de uso:** Representación gráfica y descriptiva de una funcionalidad del sistema, que muestra la interacción entre un actor (usuario o administrador) y el sistema. [cite: 364, 365]
* [cite_start]**Dashboard:** Panel de visualización de indicadores clave (KPIs), métricas y estadísticas, en este caso implementado con Power BI. [cite: 366]
* [cite_start]**ETL (Extract, Transform, Load):** Proceso de extracción de datos del SEACE, transformación para su limpieza y estandarización, y carga en la base de datos del sistema. [cite: 368]
* [cite_start]**Frontend:** Parte del sistema visible para el usuario, desarrollada en React/NextJS, que permite la interacción con el backend. [cite: 370]
* [cite_start]**KPI (Key Performance Indicator):** Indicador clave de desempeño que permite evaluar la eficiencia y resultados del sistema. [cite: 371]
* [cite_start]**MVP (Minimum Viable Product / Producto Mínimo Viable):** Versión inicial del sistema que ofrece un conjunto mínimo de funcionalidades para validar su utilidad y usabilidad. [cite: 372]
* [cite_start]**NLP (Natural Language Processing):** Técnica de procesamiento de lenguaje natural utilizada para analizar y clasificar los textos de los procesos SEACE en rubros específicos. [cite: 373]
* [cite_start]**OSCE (Organismo Supervisor de las Contrataciones del Estado):** Entidad pública que administra el SEACE en el Perú. [cite: 377]
* [cite_start]**Power BI:** Herramienta de Microsoft utilizada para la construcción de dashboards y reportes visuales dinámicos. [cite: 378]
* [cite_start]**RAG (Retrieval-Augmented Generation):** Técnica de inteligencia artificial que combina recuperación de información y generación de texto para brindar recomendaciones precisas. [cite: 379]
* [cite_start]**React/NextJS:** Frameworks de JavaScript utilizados para construir la interfaz de usuario (frontend) del sistema. [cite: 380, 381]
* [cite_start]**SEACE (Sistema Electrónico de Contrataciones del Estado):** Plataforma oficial del Estado peruano donde se registran las contrataciones y licitaciones públicas. [cite: 382, 383]
* [cite_start]**Sprint 1:** Primera iteración de desarrollo que agrupa entregables iniciales derivados de la generación de proyectos. [cite: 384]
* [cite_start]**Usuario final:** Actor del sistema que consulta información, realiza búsquedas y descarga reportes. [cite: 385]
* [cite_start]**Administrador:** Actor encargado de la configuración del sistema, ejecución de procesos ETL, control de accesos y supervisión general. [cite: 386]

---

### 1.4. [cite_start]Organización del documento [cite: 389]


---

## 2. OBJETIVOS Y RESTRICCIONES ARQUITECTONICAS

[Establezca las prioridades de los requerimientos y las restricciones del proyecto]

### 2.1. [cite_start]Priorización de requerimientos [cite: 430]

[Se procede a desplegar los requerimientos funcionales y no funcionales desde una perspectiva de priorización, mediante una tabla resumen donde pueda desplegar los requerimientos del sistema de la siguiente forma:

| ID | Descripcion | Prioridad |
| :-- | :--- | :--- |

[cite_start]Asimismo con esta prioridad se definirá el orden de implementación.] [cite: 430]

#### 1.1.1. [cite_start]Requerimientos Funcionales [cite: 431]

[cite_start][Definir la prioridad de los requerimientos funcionales.] [cite: 431]

| ID | Descripcion | Prioridad |
| :-- | :--- | :--- |

#### 1.1.2. [cite_start]Requerimientos No Funcionales – Atributos de Calidad [cite: 432]

[cite_start][Definir la prioridad de los requerimientos NO funcionales.] [cite: 432]

| ID | Descripcion | Prioridad |
| :-- | :--- | :--- |

---

### 2.2. [cite_start]Restricciones [cite: 434]

[cite_start][Aquí van las restricciones del proyecto] [cite: 434]

---

## 3. REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA

### 3.1. [cite_start]Vista de Caso de uso [cite: 435]

[cite_start][En esta sección se describen los casos de uso del sistema (nombre de la aplicación), donde se abarcan todas las funcionalidades del sistema, se muestran los actores que interactúan en el sistema y las funcionalidades asociadas; [cite: 435] [cite_start]asimismo se listará los casos de uso o escenarios del modelo de casos de uso que representen funcionalidades centrales del sistema final, que requieran una gran cobertura arquitectónica o aquellos que impliquen algún punto especialmente delicado de la arquitectura. [cite: 436] [cite_start]La documentación a incluir en esta sección corresponde a la obtenida como consecuencia de la actividad “Realización de casos de uso”: [cite: 437]

* [cite_start]**Flujos de eventos- Diseño:** descripción textual de cómo se realiza el caso de uso en términos de los objetos que colaboran. [cite: 437]
* [cite_start]**Resumen de los diagramas conectados con el caso de uso y explicación de sus relaciones.** [cite: 438]
* [cite_start]**Diagramas de interacción:** Diagramas de secuencia, Diagramas de colaboración, objetos participantes, Diagramas de clases. [cite: 439]
* [cite_start]**Requisitos derivados:** Descripción textual que recoge todos los requisitos, normalmente los no funcionales, de la realización del caso de uso no que han de tenerse en cuenta durante la implementación] [cite: 440]

#### 1.1.3. Diagramas de Casos de uso


---

### 3.2. [cite_start]Vista Lógica [cite: 442]

[cite_start][La vista lógica se encarga de representar los requerimientos funcionales del sistema. [cite: 442] [cite_start]Esta sección describe las partes del diseño del modelo significativas para la arquitectura, tales como subsistemas y paquetes.] [cite: 443]

#### 3.2.1. [cite_start]Diagrama de Subsistemas (paquetes) [cite: 444]


#### 3.2.2. Diagrama de Secuencia (vista de diseño)


#### 3.2.3. Diagrama de Colaboración (vista de diseño)


#### 3.2.4. [cite_start]Diagrama de Objetos [cite: 447]


#### 3.2.5. Diagrama de Clases


#### 3.2.6. [cite_start]Diagrama de Base de datos (relacional o no relacional) [cite: 450]

---

### 3.3. Vista de Implementación (vista de desarrollo)

[Se detalla la estructura general del Modelo de Implementación y el mapeo de los subsistemas, paquetes y clases de la Vista Lógica a subsistemas y componentes de implementación de manera más detallada]

#### 3.3.1. [cite_start]Diagrama de arquitectura software (paquetes) [cite: 452]


#### 3.3.2. Diagrama de arquitectura del sistema (Diagrama de componentes)


---

### 3.4. [cite_start]Vista de procesos [cite: 453]

[cite_start][Describe la descomposición del sistema procesos pesados. [cite: 454] [cite_start]Indica que procesos o grupos de procesos se comunican o interactúan entre sí y los modos en que estos se comunican.] [cite: 455]

#### 3.4.1. [cite_start]Diagrama de Procesos del sistema (diagrama de actividad) [cite: 456]


---

### 3.5. Vista de Despliegue (vista física)

#### 3.5.1. [cite_start]Diagrama de despliegue [cite: 458]

[cite_start][un diagrama de despliegue, amplía el sistema de software y muestra los contenedores (aplicaciones, almacenamiento de datos, microservicios, etc.) que componen este sistema de software] [cite: 458]


---

## 4. ATRIBUTOS DE CALIDAD DEL SOFTWARE

[cite_start][Los Atributos de Calidad (QAs) son propiedades medibles y evaluables de un sistema, estas propiedades son usadas para indicar el grado en que el sistema satisface las necesidades de los stakeholders [Wojcik 2013]. [cite: 458] [cite_start]Los QAs además son concebidos como aquellos requerimientos que no son funcionales. [cite: 459] [cite_start]De hecho, la funcionalidad es mayormente ortogonal a los QAs; [cite: 460] [cite_start]un diseño puede cumplir con la funcionalidad deseada y fallar a la hora de satisfacer sus requerimientos de calidad. [cite: 461] [cite_start]De esta manera, se entiende a la funcionalidad como la capacidad del sistema para hacer el trabajo para el cual fue pensado, independientemente de la estructura. [cite: 462] [cite_start]Existen QAs mayormente usados que se suelen identificar en numerosos sistemas y se tienen que describir, aunque la lista no es fina ya que muy a menudo hay situaciones en que podrían identificarse y proponerse nuevas propiedades para las diversas necesidades de stakeholders.] [cite: 463, 464]

### [cite_start]Escenario de Funcionalidad [cite: 465]

[cite_start][se califica de acuerdo con el conjunto de características y capacidades del programa, la generalidad de las funciones que se entregan y la seguridad general del sistema.] [cite: 465]

### Escenario de Usabilidad

[cite_start][Este atributo de calidad se refiere a la facilidad con la que un usuario puede aprender a utilizar e interpretar los resultados producidos por un sistema [Barbacci 1995]. [cite: 466] [cite_start]Para este atributo de calidad, se suelen considerar diversos aspectos de la interacción humano computadora, tales como: aprendizaje del sistema, utilización eficiente del sistema, minimización del impacto de errores, adaptación del sistema a las necesidades del usuario, confianza y satisfacción, entre otros.] [cite: 466]

### Escenario de confiabilidad

[cite_start][Es el equilibrio entre la confidencialidad, la integridad, la irrefutabilidad y la disponibilidad de la información y datos manipulados por el sistema. [cite: 467] [cite_start]Se trata del estado de un sistema, el cual puede ser transitorio y volátil. [cite: 468] [cite_start]La seguridad de un sistema se caracteriza por mecanismos y técnicas empleados para intentar reducir los más posible el impacto provocado por un ataque, y las amenazas (entendidas como los caminos mediante los cuales se pueden provocar un ataque). [cite: 469] Abarca los planos de observación físico, lógico y humanos. [cite_start]Posee tres tipos de enfoque: prevención, precaución y reacción.] [cite: 469]

### Escenario de rendimiento

[cite_start][Se mide con base en la velocidad de procesamiento, el tiempo de respuesta, el uso de recursos, el conjunto y la eficiencia.] (Pressman 2010, pág. 187) [cite: 470]

### Escenario de mantenibilidad

[cite_start][Combina la capacidad del programa para ser ampliable (extensibilidad), adaptable y servicial.] (Pressman 2010, pág. 187) [cite: 471]

### Otros Scenarios

[“Otros escenarios como por ejemplo: Performance”
[cite_start]Performance: El atributo de calidad Performance se refiere a la capacidad de responder, ya sea el tiempo requerido para responder a eventos determinados, o bien, la cantidad de eventos procesados en un intervalo de tiempo dado. [cite: 472] [cite_start]La Performance caracteriza la proyección en el tiempo de los servicios entregados por el sistema.] [cite: 472]