#ifndef _LoraDataHandler_MeasurementFacade_h_
#define _LoraDataHandler_MeasurementFacade_h_
#include <inttypes.h>
#include "LoraWanDataHandler.hpp"
#include "../Protobuf/dustMeasurement.pb.h"

class MeasurementFacade : LoraWanDataHandler
{
  public:
    MeasurementFacade(LoraWanPriorityQueue* a_LoraWanInterface);
    void setNewMeasurementData(float a_ParticularMatter2_5, float a_ParticularMatter10, float a_Temperature, float a_Humidity);
  private:
    dustSensorMeasurement m_ProtobufData;
};
#endif