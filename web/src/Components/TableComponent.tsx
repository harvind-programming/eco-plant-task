/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useSocketNotifications } from "../customHooks/useSocketNotifications";

interface DataTableProps {
  data: any[];
}
const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Expiry</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.key}</td>
            <td>{item.value}</td>
            <td>{item.expiry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { notifications } = useSocketNotifications();
  console.log(notifications.data);
  return (
    <div>
      {notifications?.data?.map((item: any) => {
        return <p key={JSON.stringify(item)}>{JSON.stringify(item)}</p>;
      })}
      {notifications.data?.length > 0 && (
        <DataTable data={notifications.data} />
      )}
    </div>
  );
};

export default TableComponent;
