/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.0-dev at Sun Aug  5 17:39:21 2018. */

#ifndef PB_DUSTMEASUREMENT_PB_H_INCLUDED
#define PB_DUSTMEASUREMENT_PB_H_INCLUDED
#include <pb.h>

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Struct definitions */
typedef struct _dustSensorMeasurement {
    float particularMatter2_5um;
    float particularMatter10um;
    float temperature;
    float humidity;
/* @@protoc_insertion_point(struct:dustSensorMeasurement) */
} dustSensorMeasurement;

/* Default values for struct fields */

/* Initializer values for message structs */
#define dustSensorMeasurement_init_default       {0, 0, 0, 0}
#define dustSensorMeasurement_init_zero          {0, 0, 0, 0}

/* Field tags (for use in manual encoding/decoding) */
#define dustSensorMeasurement_particularMatter2_5um_tag 1
#define dustSensorMeasurement_particularMatter10um_tag 2
#define dustSensorMeasurement_temperature_tag    3
#define dustSensorMeasurement_humidity_tag       4

/* Struct field encoding specification for nanopb */
extern const pb_field_t dustSensorMeasurement_fields[5];

/* Maximum encoded size of messages (where known) */
#define dustSensorMeasurement_size               20

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define DUSTMEASUREMENT_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif
