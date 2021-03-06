// Code generated by protoc-gen-go. DO NOT EDIT.
// source: batteryState.proto

package protobuf

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type BatteryState_StateType int32

const (
	BatteryState_UNDEFINED BatteryState_StateType = 0
	BatteryState_OK        BatteryState_StateType = 1
	BatteryState_WARNING   BatteryState_StateType = 2
	BatteryState_STOP      BatteryState_StateType = 3
	BatteryState_SHUTDOWN  BatteryState_StateType = 4
)

var BatteryState_StateType_name = map[int32]string{
	0: "UNDEFINED",
	1: "OK",
	2: "WARNING",
	3: "STOP",
	4: "SHUTDOWN",
}
var BatteryState_StateType_value = map[string]int32{
	"UNDEFINED": 0,
	"OK":        1,
	"WARNING":   2,
	"STOP":      3,
	"SHUTDOWN":  4,
}

func (x BatteryState_StateType) Enum() *BatteryState_StateType {
	p := new(BatteryState_StateType)
	*p = x
	return p
}
func (x BatteryState_StateType) String() string {
	return proto.EnumName(BatteryState_StateType_name, int32(x))
}
func (x *BatteryState_StateType) UnmarshalJSON(data []byte) error {
	value, err := proto.UnmarshalJSONEnum(BatteryState_StateType_value, data, "BatteryState_StateType")
	if err != nil {
		return err
	}
	*x = BatteryState_StateType(value)
	return nil
}
func (BatteryState_StateType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_batteryState_f0cdaebfd6328aea, []int{0, 0}
}

type BatteryState struct {
	State                *BatteryState_StateType `protobuf:"varint,1,req,name=state,enum=protobuf.BatteryState_StateType,def=0" json:"state,omitempty"`
	Voltage              *float32                `protobuf:"fixed32,2,req,name=voltage" json:"voltage,omitempty"`
	XXX_NoUnkeyedLiteral struct{}                `json:"-"`
	XXX_unrecognized     []byte                  `json:"-"`
	XXX_sizecache        int32                   `json:"-"`
}

func (m *BatteryState) Reset()         { *m = BatteryState{} }
func (m *BatteryState) String() string { return proto.CompactTextString(m) }
func (*BatteryState) ProtoMessage()    {}
func (*BatteryState) Descriptor() ([]byte, []int) {
	return fileDescriptor_batteryState_f0cdaebfd6328aea, []int{0}
}
func (m *BatteryState) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BatteryState.Unmarshal(m, b)
}
func (m *BatteryState) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BatteryState.Marshal(b, m, deterministic)
}
func (dst *BatteryState) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BatteryState.Merge(dst, src)
}
func (m *BatteryState) XXX_Size() int {
	return xxx_messageInfo_BatteryState.Size(m)
}
func (m *BatteryState) XXX_DiscardUnknown() {
	xxx_messageInfo_BatteryState.DiscardUnknown(m)
}

var xxx_messageInfo_BatteryState proto.InternalMessageInfo

const Default_BatteryState_State BatteryState_StateType = BatteryState_UNDEFINED

func (m *BatteryState) GetState() BatteryState_StateType {
	if m != nil && m.State != nil {
		return *m.State
	}
	return Default_BatteryState_State
}

func (m *BatteryState) GetVoltage() float32 {
	if m != nil && m.Voltage != nil {
		return *m.Voltage
	}
	return 0
}

func init() {
	proto.RegisterType((*BatteryState)(nil), "protobuf.batteryState")
	proto.RegisterEnum("protobuf.BatteryState_StateType", BatteryState_StateType_name, BatteryState_StateType_value)
}

func init() { proto.RegisterFile("batteryState.proto", fileDescriptor_batteryState_f0cdaebfd6328aea) }

var fileDescriptor_batteryState_f0cdaebfd6328aea = []byte{
	// 176 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x4a, 0x4a, 0x2c, 0x29,
	0x49, 0x2d, 0xaa, 0x0c, 0x2e, 0x49, 0x2c, 0x49, 0xd5, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0xe2,
	0x00, 0x53, 0x49, 0xa5, 0x69, 0x4a, 0x5b, 0x18, 0xb9, 0x78, 0x90, 0x15, 0x08, 0x39, 0x72, 0xb1,
	0x16, 0x83, 0x18, 0x12, 0x8c, 0x0a, 0x4c, 0x1a, 0x7c, 0x46, 0x0a, 0x7a, 0x30, 0xa5, 0x7a, 0x28,
	0xe6, 0x80, 0xc9, 0x90, 0xca, 0x82, 0x54, 0x2b, 0xce, 0x50, 0x3f, 0x17, 0x57, 0x37, 0x4f, 0x3f,
	0x57, 0x97, 0x20, 0x88, 0x4e, 0x21, 0x09, 0x2e, 0xf6, 0xb2, 0xfc, 0x9c, 0x92, 0xc4, 0xf4, 0x54,
	0x09, 0x26, 0x05, 0x26, 0x0d, 0xa6, 0x20, 0x18, 0x57, 0xc9, 0x9d, 0x8b, 0x13, 0xae, 0x51, 0x88,
	0x97, 0x0b, 0xa1, 0x55, 0x80, 0x41, 0x88, 0x8d, 0x8b, 0xc9, 0xdf, 0x5b, 0x80, 0x51, 0x88, 0x9b,
	0x8b, 0x3d, 0xdc, 0x31, 0xc8, 0xcf, 0xd3, 0xcf, 0x5d, 0x80, 0x49, 0x88, 0x83, 0x8b, 0x25, 0x38,
	0xc4, 0x3f, 0x40, 0x80, 0x59, 0x88, 0x87, 0x8b, 0x23, 0xd8, 0x23, 0x34, 0xc4, 0xc5, 0x3f, 0xdc,
	0x4f, 0x80, 0x05, 0x10, 0x00, 0x00, 0xff, 0xff, 0xd2, 0x2d, 0x96, 0xb8, 0xd5, 0x00, 0x00, 0x00,
}
