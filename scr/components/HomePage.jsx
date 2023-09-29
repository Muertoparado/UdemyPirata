import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    errors: null,
  });

  const getFetch = async () => {
    try {
      const resopnse = await fetch(url);
      const data = await resopnse.json();
      setState({
        data,
        isLoading: false,
        errors: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        errors: error,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    getFetch()
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    errors: state.errors,
  };
};
import { useFetch } from "../hooks/useFetch";

export const UsuariosComponent = () => {
  const {
    data,
    isLoading,
    errors,
  } = useFetch("https://jsonplaceholder.typicode.com/users");
  return (
    <>
    <h1>Lista de usuarios</h1>
    {isLoading ? <h4>Cargando</h4>
    : errors ? <h4>{errors}</h4> :
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Website</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.website}</td>
          </tr>
        ))}


      </tbody>
    </table>
    }

    </>
  );
};  