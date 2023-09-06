import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderFavorites, resetFavorites, filterByStatusAndGender } from "../../Redux/actions";
import Cards from "../../components/Cards/Cards";
import style from "./Favorites.module.css";

export default function Favorites() {
  const favorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: '',
    gender: '',
  });

  useEffect(() => {
    dispatch(filterByStatusAndGender(filters.status, filters.gender));
  }, [filters.status, filters.gender]);

  function handleSort(e) {
    dispatch(orderFavorites(e.target.value));
  }

  function handleFilterChange(filterType, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  }

  function handleReset() {
    dispatch(resetFavorites());
  }

  return (
    <>
      <div className={style.selectors}>
      <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
          <option value="">
            Status
          </option>
          {["Alive", "Dead", "unknown"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select value={filters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}>
          <option value="">
            Género
          </option>
          {["Male", "Female", "unknown", "Genderless"].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <select onChange={handleSort}>
          <option value="">
            Orden
          </option>
          {["Ascendente", "Descendente"].map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
        <button onClick={handleReset} className={style.reset}>
          RESET
        </button>
      </div>
      
      <Cards characters={favorites}/>
      
    </>
  );
}