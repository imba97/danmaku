export type Callback = () => void
export type Callback1<Arg1> = (arg1: Arg1) => void
export type Callback2<Arg1, Arg2> = (arg1: Arg1, arg2: Arg2) => void
export type Callback3<Arg1, Arg2, Arg3> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3
) => void

export type Callback4<Arg1, Arg2, Arg3, Arg4> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
  arg4: Arg4
) => void

export type Callback5<Arg1, Arg2, Arg3, Arg4, Arg5> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
  arg4: Arg4,
  arg5: Arg5
) => void
