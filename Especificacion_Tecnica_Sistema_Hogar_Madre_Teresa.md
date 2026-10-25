# Especificación Técnica y Pliego de Requerimientos Funcionales y Regulatorios
## Sistema de Gestión Institucional — Hogar Madre Teresa (Viale, Entre Ríos)

---

### 1. Marco Institucional y Fundamentación Regulatoria
El desarrollo e implementación del **Sistema de Gestión Institucional para la Residencia Gerontológica "Hogar Madre Teresa"**, ubicada en la ciudad de Viale, Provincia de Entre Ríos, Argentina, responde a la necesidad de dotar a la institución de una plataforma web integral que garantice la excelencia asistencial, la trazabilidad profesional y el cumplimiento estricto del ordenamiento legal vigente en materia sanitaria, gerontológica y de protección de derechos humanos [1, 2, 3].

La arquitectura del sistema y sus reglas de negocio están configuradas en alineación directa con la pirámide normativa aplicable en la jurisdicción:
1. **Constitución Nacional y Convención Interamericana sobre la Protección de los Derechos Humanos de las Personas Mayores** (Leyes Nacionales N° 27.360 y N° 27.700 — jerarquía constitucional) [2, 8].
2. **Marco Provincial de Entre Ríos**:
   - **Ley Provincial N° 10.932**: Tipificación, normatización y reglamentación de las prestaciones de Residencias Gerontológicas de Larga Estadía (RGLE) en Entre Ríos [1, 7].
   - **Decreto Provincial N° 1116/2023 MS**: Reglamentación de la Ley 10.932, fijando como Autoridad de Aplicación al Ministerio de Salud de Entre Ríos (Unidad Ministerial de Programas y Políticas de Salud para Personas Mayores), la exigencia de habilitación municipal previa (Viale) y la fiscalización por el Equipo Interdisciplinario Básico (EPIB) [17, 19, 21].
   - **Resolución N° 705/85 SS Entre Ríos**: Exigencia del examen psicofísico de preingreso/admisión y su actualización periódica trimestral en la Historia Clínica [3, 18].
3. **Marco Nacional de Historia Clínica Electrónica y Datos Personales**:
   - **Ley Nacional N° 27.706 y Decreto Reglamentario N° 393/2023**: Programa Federal Único de Informatización y Digitalización de Historias Clínicas (SURHCE). Exige documentos digitales obligatorios, inmutables, auténticos, perdurables, con marca temporal (timestamping), accesos restringidos y firma digital/electrónica [5, 10, 11].
   - **Ley Nacional N° 26.529 (Derechos del Paciente)**: Establece que el paciente es titular de la información, la guarda y custodia obligatoria por 10 años a cargo del establecimiento y el derecho de acceso a copia en 48 horas [4, 5, 8].
   - **Ley Nacional N° 25.326 (Protección de Datos Personales)**: Califica los datos de salud como datos sensibles, imponiendo secreto profesional, cifrado de información y control de acceso basado en roles (RBAC) [4, 5, 27].
   - **Ley Nacional N° 25.506 de Firma Digital y Firma Electrónica**: Otorga plena validez jurídica a la autoría de registros clínicos y administrativos [3, 5].
   - **Resolución MSAL N° 3315/2023**: Directrices para la Organización y Funcionamiento de Residencias para Personas Mayores (Modelo de Atención Centrado en la Persona, programa libre de sujeciones y Carta de Derechos) [2, 9, 12].
4. **Normativa de Obras Sociales (INSSJP / PAMI)**:
   - **Resolución INSSJP N° 896/2023, 897/2023 y Disposiciones N° 9/2023 y 11/2023**: Reglamentan el Programa de Atención Integral en Residencias de Larga Estadía en las modalidades RLE (General) y RLEP (Especializada en Cuidados Psicogerontológicos), con exigencias específicas sobre el Legajo Único (retención mínima de 5 años post-egreso), Libro de Concurrencia Digital, administración de haberes en custodia y gestión del coseguro previsional [12, 14, 24].

---

### 2. Especificación Detallada de las Reglas Inquebrantables de Dominio

#### REGLA 1: Legajo Único Digital Integral (LUDI)
**Principio**: Todo residente activo o egresado posee un Legajo Único Digital centralizado e indivisible que unifica la totalidad de sus datos asistenciales, sociales, administrativos y legales [1, 14, 24].

*Requerimientos Funcionales y de Arquitectura*:
1.1. **Estructura Modular del Legajo**:
   - **Módulo A: Admisión y Datos Filiatorios**: Nombres y apellidos, DNI, CUIL, fecha de nacimiento, edad, nombre de elección e identidad de género autopercibida (Res. MSAL 3315/2023) [2], obra social/PAMI (N° de afiliación), fecha y hora exacta de ingreso, copia digitalizada del Acta Compromiso de Ingreso (Art. 38 Ley 10.932) [1, 22], Contrato de Servicios y Consentimiento Informado de Residencia [2, 14].
   - **Módulo B: Red de Apoyo y Contactos de Emergencia**: Datos de familiares directos, curadores, apoderados o referentes vinculares con indicación clara de jerarquía de contacto y autorización de acompañamiento [1, 16].
   - **Módulo C: Historia Clínica Electrónica (HCE)**: Examen psicofísico de preingreso (Res. 705/85 SS ER) [18], antecedentes patológicos, alergias, esquema de vacunación, evoluciones médicas periódicas, registros de interconsultas especializadas e historial de internaciones/derivaciones [5, 10, 22].
   - **Módulo D: Historia Social y Psicogerontológica**: Informe de trayectoria vital, valoración de redes de contención, informes de Trabajo Social y evaluaciones de Psicología [1, 14, 24].
   - **Módulo E: Valoraciones Profesionales por Especialidad**: Registros y planes de intervención individual de Enfermería, Terapia Ocupacional, Kinesiología, Nutrición y Musicoterapia/Recreación [1, 2].
   - **Módulo F: Histórico de VGI y PAI**: Repositorio de todas las Valoraciones Gerontológicas Integrales realizadas desde la admisión y la evolución cronológica de sus Planes de Atención Individualizados [1, 14].

1.2. **Custodia y Retención Criptográfica**:
   - El sistema debe garantizar la preservación del Legajo Único por un plazo mínimo de **10 años** desde la última actuación clínica (Ley 26.529, Art. 18) [4, 5] y mantener disponible el expediente durante al menos **5 años posteriores al egreso o fallecimiento** del residente para requerimientos de auditoría de PAMI o del Ministerio de Salud de Entre Ríos (Res. INSSJP 896/2023) [14, 24].

---

#### REGLA 2: Vigencia 100% de VGI y PAI y Panel de Control
**Principio**: Garantizar de forma automatizada que el 100% de la población de residentes activos cuente con su Valoración Gerontológica Integral (VGI) y su Plan de Atención Individualizado (PAI) vigentes y auditables [1, 14].

*Requerimientos Funcionales y de Arquitectura*:
2.1. **Digitalización de Escalas Validadas de VGI**:
   - **Esfera Funcional / Autonomía para ABVD y AIVD**: Formulario digitalizado del *Índice de Barthel* o *Índice de Katz* [14, 22].
   - **Esfera Cognitiva / Salud Mental**: Formulario del *Mini-Mental State Examination (MMSE) de Folstein* o *Pfeiffer* [14, 16].
   - **Esfera Físico-Motora y Riesgo de Caídas**: Escala de *Tinetti* (marcha y equilibrio) o *Downton* [22].
   - **Esfera Integumentaria / Riesgo de Escaras**: Escalas de *Norton* o *Braden* (vinculado con protocolos de prevención de úlceras por presión) [14, 22].
   - **Esfera Nutricional y Social**: *Mini Nutritional Assessment (MNA)* y escala de valoración socio-familiar [1, 2].

2.2. **Ciclo de Vida y Regla de Caducidad**:
   - **Plazo Estándar de Vigencia**: Toda VGI y su correspondiente PAI tienen un período máximo de validez de **6 meses (180 días corridos)** desde su fecha de firma [14].
   - **Disparador por Cambio Clínico Abrupto**: Ante cualquier evento clínico relevante registrado en la HCE (caída con fractura, ACV, descompensación hemodinámica, alta post-internación o deterioro cognitivo agudo), el sistema marcará automáticamente la VGI vigente como "Requerimiento de Actualización por Cambio Clínico", notificando al equipo interdisciplinario [5, 14].
   - **Formulación del PAI**: A partir de los hallazgos de la VGI, el sistema obliga a la carga del PAI, estableciendo objetivos asistenciales, intervenciones por especialidad, profesionales asignados y metas a evaluar en la siguiente VGI [1, 14].

2.3. **Monitor y Dashboard de Alertas Visuales**:
   - **Indicadores Globales (KPIs)**: Métrica principal visible en la pantalla de inicio del sistema: *"Porcentaje de Cobertura VGI/PAI Vigente"* (Meta Inquebrantable = 100%) [1, 14].
   - **Semáforo Visual de Alertas de Control**:
     - 🟢 **Verde (Vigente)**: Evaluaciones con más de 30 días previos a su vencimiento.
     - 🟡 **Amarillo (Próxima a Vencer)**: Evaluaciones a 30 días o menos de alcanzar los 180 días de vigencia.
     - 🔴 **Rojo (Incompleta / Vencida / Requerida por Cambio Clínico)**: Evaluaciones que superaron los 180 días sin actualización o interrumpidas por evento agudo.

---

#### REGLA 3: Trazabilidad Profesional (Fecha, Hora, Firma y Sello)
**Principio**: Todo registro, evolución, informe profesional o valoración guardada en el sistema debe ser inmutable, rastreable y contar con la acreditación unívoca del profesional interviniente [3, 5, 10].

*Requerimientos Funcionales y de Arquitectura*:
3.1. **Inmutabilidad y Base de Datos Append-Only (Ley 27.706)**:
   - Queda estrictamente prohibida la edición directa (`UPDATE`) o eliminación (`DELETE`) de asientos clínicos o sociales validados [3, 5, 10].
   - Toda corrección de un registro previo se realizará mediante un evento de **Nota Aclaratoria**, el cual se anexa al historial conservando el texto original, la nota nueva, la fecha/hora exacta sincronizada por protocolo NTP y la identidad del profesional [3, 5, 10].

3.2. **Estructura Obligatoria del Bloque de Validación**:
   - **Fecha y Hora**: Sello de tiempo automático generado por el servidor (no modificable por el usuario cliente).
   - **Usuario Autenticado**: Identificación unívoca del agente con credenciales validadas.
   - **Firma Digital / Manuscrita**: Captura de firma en pad táctil/pantalla o aplicación de firma digital/electrónica registrada en el perfil del usuario [3, 50].
   - **Sello Profesional Reglamentario**:
     - Nombre y Apellido completo.
     - Título Profesional y Especialidad (ej.: *Médico Geriatra, Lic. en Enfermería, Lic. en Trabajo Social, Terapista Ocupacional*).
     - **N° de Matrícula Provincial de Entre Ríos** (verificada contra el Registro Federal de Profesionales de la Salud - REFEPS y Colegios Profesionales correspondientes) [5, 20].

3.3. **Motor de Exportación a PDF e Impresión Oficial**:
   - La vista de impresión o exportación de cualquier documento clínico/social debe generar un archivo PDF no editable conteniendo:
     - Membrete formal institucional: *"Residencia Gerontológica Hogar Madre Teresa — Viale, Entre Ríos"*.
     - Marca de agua o Hash de verificación de integridad [3, 5].
     - Pie de página con el bloque formal completo de **Fecha, Hora, Firma y Sello Profesional**.

---

#### REGLA 4: Alimentación Automática de Datos y Diagnóstico Poblacional
**Principio**: Evitar la duplicación de carga operativa mediante la consolidación automática de los datos estructurados provenientes de los Legajos Únicos y las VGI vigentes [1, 14].

*Requerimientos Funcionales y de Arquitectura*:
4.1. **Grilla de Recolección de Datos Automatizada**:
   - La plataforma consolidará en tiempo real la matriz de datos poblacionales combinando: perfil demográfico, nivel de dependencia funcional (autoválido, semi-dependiente, dependiente severo), estado cognitivo y clasificación prestacional [1, 14, 217].

4.2. **Módulo de Diagnóstico Poblacional Dinámico**:
   - **Distribución de Dependencia**: Gráficos analíticos que muestran el porcentaje de residentes por categorías de Barthel/Katz (insumo clave para el cálculo de dotación de personal según la Res. MSAL 3315/2023) [2, 215].
   - **Perfil Cognitivo Institucional**: Mapeo de prevalencia de deterioro cognitivo leve, moderado y severo (orientativo para la acreditación de la modalidad RLEP ante PAMI) [12, 14, 217].
   - **Mapa de Riesgo Asistencial**: Reporte de residentes con alto riesgo de caída (Tinetti) y alto riesgo de escaras (Norton/Braden), alimentando las alarmas del área de Enfermería [14, 22].
   - **Matriz Epidemiológica y de Eventos**: Reportes automáticos de infecciones, internaciones y alertas para el Sistema Nacional de Vigilancia de la Salud (SNVS) [275, 351].

4.3. **Reportes Institucionales para Organismos de Contralor**:
   - Generación en 1 clic de reportes en formato oficial para inspecciones del **EPIB (Ministerio de Salud de Entre Ríos)**, controles del **Municipio de Viale** y auditorías del **INSSJP-PAMI** (Libro de Concurrencia Digital) [1, 14, 214].

---

#### REGLA 5: Idioma, Accesibilidad y Usabilidad (UX/UI)
**Principio**: Ofrecer una interfaz de usuario optimizada, de alta legibilidad, intuitiva y configurada para el entorno operativo de los profesionales y administrativos de Argentina [2].

*Requerimientos Funcionales y de Arquitectura*:
5.1. **Adaptación Lingüística y Territorial**:
   - Interfaz redactada íntegramente en español con modismos técnicos y administrativos de Argentina (*Legajo, Matrícula Provincial, DNI, Coseguro, PAMI, UGL, BORA, ARCA/AFIP*) [2, 5].

5.2. **Accesibilidad y Usabilidad Operativa**:
   - **Estándar WCAG 2.1 Nivel AA**: Diseño de alto contraste, tipografía sans-serif moderna de fácil lectura en monitores de enfermería y dispositivos móviles/tablets [2].
   - **Navegación Táctil para Enfermería y Cuidadoras**: Interfaz del Registro Electrónico de Administración de Medicamentos (MAR) y hojas de ruta con botones de gran tamaño optimizados para touch-pads en rondas nocturnas o pasillos [3, 224].
   - **Seguridad por Roles (RBAC) y Privacidad Visual**: Los perfiles administrativos y de facturación acceden únicamente a datos demográficos y contables; la información clínica profunda queda restringida exclusivamente al equipo técnico asistencial autenticado (Ley 25.326) [4, 5, 225].

---

### 3. Módulos Funcionales Complementarios y Reglas de Negocio

```
                               ┌─────────────────────────────────────────────────────────┐
                               │  SISTEMA DE GESTIÓN INTEGRAL HOGAR MADRE TERESA (VIALE) │
                               └────────────────────────────┬────────────────────────────┘
                                                            │
         ┌──────────────────────┬───────────────────────────┼───────────────────────────┬──────────────────────┐
         │                      │                           │                           │                      │
┌────────┴─────────┐   ┌────────┴──────────┐      ┌─────────┴─────────┐       ┌─────────┴────────┐   ┌─────────┴────────┐
│ 1. LEGAJO ÚNICO  │   │ 2. MONITOR VGI    │      │ 3. ENFERMERÍA Y   │       │ 4. HABERES Y     │   │ 5. CONTROL DE    │
│    DIGITAL (LUDI)│   │    Y PAI (100%)   │      │    FARMACIA (MAR) │       │    COSEGURO PAMI │   │    STAFF Y RATIOS│
└──────────────────┘   └───────────────────┘      └───────────────────┘       └──────────────────┘   └──────────────────┘
```

#### 3.1. Módulo de Enfermería, Medicación y Trazabilidad Farmacéutica (MAR)
- **Integración con Receta Electrónica**: Conexión con plataformas aprobadas en el ReNaPDiS (Ley 27.553 / Res. 1959/2024 MSAL) para la recepción directa de prescripciones digitales [5, 224].
- **Kardex Digital de Enfermería (MAR)**: Muestra las indicaciones médicas ordenadas por horario. Exige la confirmación individual de la administración de fármacos por parte del enfermero/a (con hora exacta, firma de usuario y registro de eventuales rechazos o vómitos) [3, 5, 10].
- **Protocolo de No Sujeción y Psicofármacos**: Todo uso de psicofármacos o contención física excepcional debe registrarse con la fundamentación médica, prescripción firmada, consentimiento informado y límite temporal conforme a las Directrices de Calidad (Res. MSAL 3315/2023) [2, 269, 340].

#### 3.2. Módulo de Haberes en Custodia y Coseguro Previsional (PAMI)
- **Libro Caja del Residente**: Registro contable digital para el dinero en custodia depositado por el residente o su apoderado. Emite comprobantes de ingresos y egresos con doble autenticación (Res. INSSJP 896/2023) [14, 218].
- **Calculadora de Coseguro Previsional**: Aplica la escala legal de descuentos sobre los haberes previsionales del residente (eximiendo a quienes perciben menos de 1 haber mínimo y aplicando topes máximos acordes a la norma vigente) [90, 218, 282].

#### 3.3. Módulo de Cumplimiento de Personal y Ratios Legales
- **Motor de Control de Staff**: Valida que la grilla de turnos cumpla con los ratios mínimos exigidos por la Ley Provincial N° 10.932 (Art. 30) y la Res. MSAL N° 3315/2023 [1, 2, 215]:
  - *Director/Coordinador*: Profesional con matrícula y formación gerontológica.
  - *Enfermería*: Ratios por turno en función del nivel de dependencia de los residentes.
  - *Nocheros / Guardia Nocturna*: Presencia obligatoria de **más de 1 agente activo** de forma ininterrumpida durante la noche [2, 226].

---

### 4. Matriz de Trazabilidad Regulatoria vs. Funcionalidades del Sistema

| Norma / Jurisdicción | Artículo / Resolución | Requisito Legal / Exigencia | Regla de Negocio Codificada en el Software |
| :--- | :--- | :--- | :--- |
| **Provincia de Entre Ríos** | Ley 10.932 - Art. 38 [1, 22] | Suscripción obligatoria del Acta Compromiso de Ingreso | Bloqueo de activación del Legajo hasta la carga digitalizada de la firma del residente/apoderado [1, 22]. |
| **Provincia de Entre Ríos** | Res. 705/85 SS ER [3, 18] | Examen psicofísico de admisión y renovación trimestral | Alerta automática en el Dashboard de Medicina cada 90 días para actualización del examen [18, 222]. |
| **Nación Argentina** | Ley 27.706 / Dec. 393/2023 [10, 11] | HCE inmutable, auténtica, con marca temporal y firma digital/electrónica | Base de datos Append-Only (prohibición de UPDATE/DELETE). Correcciones vía notas aclaratorias con timestamp NTP [3, 5, 10]. |
| **Nación Argentina** | Ley 26.529 - Art. 18 [4, 5] | Guarda y custodia de HCE por 10 años mínimos | Motor de archivo frío y retención criptográfica garantizada por un decenio [4, 5, 210]. |
| **Nación Argentina** | Ley 25.326 - Art. 7/8 [4, 27] | Protección de datos de salud como Datos Sensibles | Cifrado en reposo (AES-256), comunicación TLS 1.3, roles RBAC y Audit Log inalterable [3, 5, 225]. |
| **Ministerio de Salud de la Nación** | Res. 3315/2023 (Anexo Directrices) [2] | Personal nocturno a cargo de más de 1 persona de forma obligatoria | Bloqueo en el sistema de cierre de planillas de guardia si el cómputo nocturno es menor a 2 agentes [2, 226]. |
| **INSSJP - PAMI** | Res. 896/2023 (Anexo I) [14, 24] | Conservación de Legajos Únicos por 5 años post-egreso | Estado "Archivado-PAMI" con retención programada de 5 años tras registrar el egreso/fallecimiento [14, 218]. |
| **INSSJP - PAMI** | Res. 896/2023 (Anexo I) [14, 24] | VGI de ingreso (plazo 15 días) y actualización semestral del PAI | Semáforo visual en pantalla principal y alertas de vencimiento automatizadas a los 180 días [9, 14, 223]. |

---

### 5. Conclusión y Próximos Pasos Técnicos
Este Pliego de Requerimientos y Especificación Técnica asegura que la plataforma del **Hogar Madre Teresa (Viale, Entre Ríos)** opere con total respaldo jurídico, máxima eficiencia administrativa y una atención médica y social centrada verdaderamente en la persona mayor [1, 2, 3].

Se recomienda proceder con la etapa de desarrollo bajo un enfoque de pruebas continuas de seguridad (SAST/DAST) e integración del módulo de firma en pantalla táctil para las rondas asistenciales diarias.

---
*Documento confeccionado en base a la normativa sanitaria vigente en la República Argentina y la Provincia de Entre Ríos (Octubre 2026).*
