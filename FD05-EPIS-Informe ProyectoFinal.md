Logo de Mi Empresa		Logo de mi Cliente

![C:\Users\EPIS\Documents\upt.png](Aspose.Words.94eab696-106f-427c-a891-3a61ac62fc17.001.png)

<a name="_heading=h.ofrwu3q8yumh"></a>**UNIVERSIDAD PRIVADA DE TACNA**

**FACULTAD DE INGENIERIA**

**Escuela Profesional de Ingeniería de Sistemas**


**Informe Final** 
**\


` `**“Proyecto *SEACE ProjectFinder”***

Curso: *Inteligencia de Negocios*


Docente: *Mag. Patrick Cuadros Quiroga*


Integrantes:

*Akhtar Oviedo, Ahmed Hasan		-	(2022074261)*

*Anampa Pancca, David Jordan		-	(2022074268)*

*Salas Jimenez, Walter Emmanuel 	-	(2022073896)*





**Tacna – Perú**

***2025***


|CONTROL DE VERSIONES||||||
| :-: | :- | :- | :- | :- | :- |
|Versión|Hecha por|Revisada por|Aprobada por|Fecha|Motivo|
|1\.0|MPV|ELV|ARV|10/10/2020|Versión 1.0|
|2\.0|MPV|ELV|ARV|10/10/2020|Versión 2.0|

**INDICE GENERAL**

1. Antecedentes									1
1. Planteamiento del Problema							4
   1. Problema
   1. Justificación
   1. Alcance
1. Objetivos										6
1. Marco Teórico	
1. Desarrollo de la Solución							9
   1. Análisis de Factibilidad (técnico, económica, operativa, social, legal, ambiental)
   1. Tecnología de Desarrollo
   1. Metodología de implementación

      (Documento de VISION, SRS, SAD)

1. Cronograma									11
1. Presupuesto									12
1. Conclusiones									13

Recomendaciones									14

Bibliografía										15

Anexos										16

Anexo 01 Informe de Factiblidad

Anex0 02   Documento de Visión

Anexo 03 Documento SRS

Anexo 04 Documento SAD

Anexo 05 Manuales y otros documentos




1\. ANTECEDENTES

En el Perú, el Sistema Electrónico de Contrataciones del Estado (SEACE), administrado por el OSCE, es la plataforma oficial para la publicación de licitaciones, concursos y contrataciones públicas. Sin embargo, la gran cantidad de registros, la diversidad de formatos y la falta de herramientas analíticas avanzadas dificultan la consulta eficiente de la información.

En los últimos años, el auge del Business Intelligence (BI) y el Procesamiento de Lenguaje Natural (NLP) ha permitido aprovechar los datos públicos para la toma de decisiones y la generación de conocimiento. No obstante, en el contexto peruano, no existen herramientas que integren ambos enfoques aplicados al SEACE.

Frente a ello, surge la necesidad de diseñar un sistema que recopile, analice y visualice los datos del SEACE, transformándolos en información útil para investigadores, ingenieros y empresarios. De esta necesidad nace el proyecto SEACE ProjectFinder, una plataforma de inteligencia de negocios que permite centralizar y analizar contrataciones públicas para identificar oportunidades de desarrollo tecnológico y proponer ideas de proyectos con base en necesidades reales del Estado.

2\. PLANTEAMIENTO DEL PROBLEMA

2\.1 Problema

Actualmente, la consulta de información en el portal SEACE resulta limitada debido a:

- El alto volumen de registros y documentos no estructurados.
- Las restricciones en búsquedas personalizadas.
- La falta de integración con herramientas analíticas.

Esto impide a estudiantes, investigadores y empresarios aprovechar los datos públicos para generar proyectos de innovación, identificar oportunidades de negocio o analizar patrones de inversión estatal.\
` `El problema central se formula de la siguiente manera:

¿Cómo desarrollar un sistema de inteligencia de negocios que permita analizar y transformar la información del SEACE en oportunidades de proyectos tecnológicos y estratégicos?

2\.2 Justificación

El desarrollo de este sistema busca ofrecer una herramienta que:

- Facilite la consulta estructurada y clasificación automática de procesos del SEACE.
- Promueva la transparencia y análisis de contrataciones públicas.
- Fomente la innovación tecnológica basada en necesidades del Estado.
- Sirva como apoyo educativo y empresarial en la generación de proyectos de software, mediante dashboards, reportes y recomendaciones automáticas.

Además, el proyecto contribuye al desarrollo académico y profesional al aplicar técnicas de inteligencia de negocios, minería de datos y procesamiento de lenguaje natural, alineadas con las tendencias actuales de transformación digital.

2\.3 Alcance

El sistema SEACE ProjectFinder abarca:

- Extracción, transformación y carga (ETL) de datos públicos del SEACE.
- Clasificación automática de procesos mediante NLP.
- Generación de ideas de proyectos con entregables y MVP.
- Visualización de resultados en dashboards interactivos (Power BI).
- Exportación de reportes (PDF, Excel) y gestión de usuarios (roles y accesos).

La arquitectura es modular, escalable y basada en tecnologías web modernas, con posibilidad de futura integración con modelos de IA generativa (RAG + embeddings).

3\. OBJETIVOS

Objetivo General

Desarrollar un Sistema que permita analizar, clasificar y visualizar los procesos de contratación pública del SEACE, transformando los datos en oportunidades concretas de proyectos tecnológicos.

Objetivos Específicos

- Diseñar un módulo ETL para la extracción y transformación de registros públicos del SEACE.
- Implementar un modelo NLP para la clasificación automática de rubros y requerimientos.
- Desarrollar un dashboard interactivo en Power BI para el análisis de tendencias y métricas.
- Crear un motor de búsqueda avanzada con filtros y exportación de resultados.
- Integrar un sistema de autenticación y control de roles para usuarios y administradores.

4\. MARCO TEÓRICO

El sistema se sustenta en los siguientes conceptos:

- SEACE: Plataforma del Estado peruano donde se registran los procesos de contratación pública.
- Business Intelligence (BI): Conjunto de metodologías y herramientas orientadas al análisis y presentación de información estratégica.
- ETL (Extract, Transform, Load): Proceso de integración de datos que permite extraer información de diferentes fuentes, transformarla y cargarla en una base de datos.
- NLP (Natural Language Processing): Campo de la IA que analiza lenguaje natural para extraer patrones o clasificar información textual.
- MVP (Producto Mínimo Viable): Versión inicial de un producto con las funciones esenciales para validar su valor real.
- Power BI: Plataforma de visualización de datos utilizada para crear reportes y dashboards.
- FastAPI / NodeJS / React / NextJS: Tecnologías modernas para el desarrollo web escalable y de alto rendimiento.

## <a name="_heading=h.4eu84oltiio6"></a>5. DESARROLLO DE LA SOLUCIÓN
### <a name="_heading=h.ga2yjct4l6yy"></a>5.1 Análisis de Factibilidad

|Tipo|Descripción|Resultado|
| :-: | :-: | :-: |
|Técnica|Tecnologías viables y de código abierto (FastAPI, React, PostgreSQL, Power BI).|Factible|
|Económica|Uso de herramientas gratuitas o académicas; bajo costo de hosting.|Factible|
|Operativa|La solución mejora la eficiencia en la búsqueda y análisis de procesos.|Factible|
|Social|Promueve la transparencia y acceso público a información estatal.|Positivo|
|Legal|Datos públicos del SEACE, sin infringir derechos de autor.|Cumple|
|Ambiental|Uso digital, sin impacto ambiental significativo.|Neutro|

5\.2 Tecnología de Desarrollo

- Frontend: React / NextJS
- Backend: FastAPI / NodeJS
- Base de Datos: PostgreSQL
- ETL: Python + BeautifulSoup / Selenium
- Análisis NLP: spaCy / transformers
- Dashboard: Power BI
- Infraestructura: despliegue local o nube (Azure / AWS / Render).


5\.3 Metodología de Implementación

El desarrollo sigue un enfoque ágil (Scrum), con iteraciones cortas y entregables continuos.\
` `Documentos elaborados:

- Documento de Visión: define propósito y alcance del sistema.
- SRS (Software Requirements Specification): detalla requerimientos funcionales y no funcionales.
- SAD (Software Architecture Document): describe la arquitectura lógica, física y de componentes.

6\. CRONOGRAMA

|Fase|Actividad|Duración|Fecha estimada|
| :-: | :-: | :-: | :-: |
|1|Análisis y Recolección de Requisitos|2 semanas|Set. 2025|
|2|Diseño de Arquitectura (SAD)|2 semanas|Oct. 2025|
|3|Desarrollo Backend y ETL|3 semanas|Oct.–Nov. 2025|
|4|Desarrollo Frontend y NLP|3 semanas|Nov. 2025|
|5|Integración Power BI y Pruebas|2 semanas|Dic. 2025|
|6|Documentación y Presentación Final|1 semana|Dic. 2025|

7\. PRESUPUESTO

|Concepto|Costo estimado (S/.)|
| - | - |
|Desarrollo (recursos humanos)|1,200|
|Infraestructura (hosting / nube)|150|
|Licencias (Power BI académico)|0|
|Documentación e impresión|50|
|Total estimado|S/ 1,400|

8\. CONCLUSIONES

- El sistema SEACE ProjectFinder responde a una necesidad real de análisis eficiente de información pública.
- La arquitectura modular y las tecnologías seleccionadas garantizan escalabilidad y mantenibilidad.
- La aplicación de técnicas de BI y NLP permite generar conocimiento útil y promover innovación.
- La plataforma complementa el SEACE oficial, añadiendo valor para la comunidad académica y empresarial.

9\. RECOMENDACIONES

- Ampliar la base de datos para incluir otras fuentes públicas (MEF, OSCE, INEI).
- Implementar en futuras versiones módulos de IA generativa (RAG) para recomendaciones más precisas.
- Desplegar el sistema en la nube para mejorar disponibilidad y rendimiento.
- Mantener entrenamiento continuo de los modelos NLP con nuevos datos del SEACE.

10\. BIBLIOGRAFÍA

- OSCE. (2024). *Sistema Electrónico de Contrataciones del Estado (SEACE)*. Lima, Perú.
- Kruchten, P. (1995). *Architectural Blueprints — The “4+1” View Model of Software Architecture.* IEEE Software.
- Microsoft. (2023). *Power BI Documentation*.
- FastAPI Developers. (2024). *FastAPI Official Documentation.*\

- spaCy.io. (2024). *Industrial-Strength NLP in Python.*\

- Pressman, R. (2019). *Ingeniería del Software: Un enfoque práctico.* McGraw-Hill.
- Sommerville, I. (2020). *Software Engineering.* Pearson.



