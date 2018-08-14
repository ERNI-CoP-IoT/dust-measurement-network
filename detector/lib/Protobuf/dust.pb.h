/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.0-dev at Sun Jul 22 14:52:20 2018. */

#ifndef PB_DUST_PB_H_INCLUDED
#define PB_DUST_PB_H_INCLUDED
#include <pb.h>

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Struct definitions */
typedef struct _dustMessage {
    int32_t dustPercentage;
/* @@protoc_insertion_point(struct:dustMessage) */
} dustMessage;

/* Default values for struct fields */

/* Initializer values for message structs */
#define dustMessage_init_default                 {0}
#define dustMessage_init_zero                    {0}

/* Field tags (for use in manual encoding/decoding) */
#define dustMessage_dustPercentage_tag           1

/* Struct field encoding specification for nanopb */
extern const pb_field_t dustMessage_fields[2];

/* Maximum encoded size of messages (where known) */
#define dustMessage_size                         11

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define DUST_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif
