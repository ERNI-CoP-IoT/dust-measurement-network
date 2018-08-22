
#ifndef _LoraDataHandler_SystemStatusFacade_h_
#define _LoraDataHandler_SystemStatusFacade_h_
#include <inttypes.h>
#include "LoraWanDataHandler.hpp"
#include "../Protobuf/batteryState.pb.h"
#include <map>
class SystemStatusFacade : LoraWanDataHandler
{
  public:
    SystemStatusFacade(LoraWanPriorityQueue* a_LoraWanInterface);
    enum class State {
      e_UNDEFINED,
      e_OK,
      e_WARNING,
      e_STOP,
      e_SHUTDOWN
    };
    void setBatteryStatus(State a_State, float a_Voltage);
  private:
    const std::map<State,batteryState_StateType> m_ConstMapperState {
      {State::e_UNDEFINED, batteryState_StateType_UNDEFINED},
      {State::e_OK, batteryState_StateType_OK},
      {State::e_WARNING, batteryState_StateType_WARNING},
      {State::e_STOP, batteryState_StateType_STOP},
      {State::e_SHUTDOWN, batteryState_StateType_STOP}
    };
};
#endif