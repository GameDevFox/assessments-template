import React from "react";

interface Props {
  value: string;
}

export const Icon = (props: Props) => <i {...props} className={`icon fa fa-${props.value}`}/>;
