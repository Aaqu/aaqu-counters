/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

interface Input {
  form?: string;
  name: string;
  id: string;
}

export const TcpPortInput = (props: Input) => {
  return (
    <input
      type="text"
      {...props}
      placeholder="192.168.1.8:26"
      defaultValue="192.168.1.8:26"
      pattern="^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}(:((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{1,5})|([0-9]{1,4}))))?$|^$"
      required
    />
  );
};
