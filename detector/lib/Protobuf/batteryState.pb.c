/* Automatically generated nanopb constant definitions */
/* Generated by nanopb-0.4.0-dev at Wed Aug 22 08:54:06 2018. */

#include "batteryState.pb.h"

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

const protobuf_batteryState_StateType protobuf_batteryState_state_default = protobuf_batteryState_StateType_UNDEFINED;


const pb_field_t protobuf_batteryState_fields[3] = {
    PB_FIELD(  1, UENUM   , REQUIRED, STATIC  , FIRST, protobuf_batteryState, state, state, &protobuf_batteryState_state_default),
    PB_FIELD(  2, FLOAT   , REQUIRED, STATIC  , OTHER, protobuf_batteryState, voltage, state, 0),
    PB_LAST_FIELD
};



/* @@protoc_insertion_point(eof) */