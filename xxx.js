import { useQuery, useMutation } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const deleteData = async (id) => {
  const response = await fetch(`https://api.example.com/data/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete request failed");
  }
};

const MyComponent = () => {
  const { data, error, isLoading } = useQuery("myQueryKey", fetchData);
  const mutation = useMutation(deleteData);

  const handleDelete = async (id) => {
    try {
      await mutation.mutateAsync(id);
      // Инвалидация кэша запроса 'myQueryKey' через 1000 миллисекунд (1 секунда)
      setTimeout(() => {
        queryClient.invalidateQueries("myQueryKey");
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <div>
      {/* Ваш код для отображения данных */}
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
