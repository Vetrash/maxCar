import React from 'react';
import Dropdown from 'react-dropdown';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import classes from './components/style/marketDesk.module.css';
import dropDownCN from './components/style/dropDown.module.css';
import Loader from './components/loader';
import Cart from './components/Cart';



const Market = () => {
  const [collumns, setCollumns] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const options = ['Audi', 'Mitsubishi', 'Volkswagen', 'Kia', 'Honda', 'Hyundai'];
  const defaultOption = options[0];
  let windowInnerWidth = window.innerWidth;
  let autos = null;

  const getCars = async (val) => {
    setLoading(true);
    const response = await fetch(`https://maximum.expert/api/stock-test?brand=${val}`, {
      method: 'GET',
    });
    const data = await response.json();
    autos = data.list;
	console.log(autos)
    getColumns();
    if (collumns.length === 0) setLoading(false);
  };

  useEffect(() => {
    getCars(defaultOption);
    window.addEventListener('resize', chekResize);
  }, []);

  useEffect(() => {
    if (collumns.length === 0) return;
    setLoading(false);
  }, [collumns]);

  //Перестройка сетки при изменении ширины экрана
  const chekResize = () => {
    const newWindowInnerWidth = window.innerWidth;
    if (windowInnerWidth === newWindowInnerWidth) return;
    windowInnerWidth = newWindowInnerWidth;
    getColumns();
  };

  //разбитие информации на несколько столцов
  const getColumns = () => {
    let sumCol = Math.round((window.innerWidth * 0.8) / 435);
    const lengthCol = autos.length / sumCol;
    const columns = [];
    for (let i = 0; i < autos.length; i += lengthCol) {
      columns.push(autos.slice(i, i + lengthCol));
    }
    setCollumns(columns);
  };

  const cloneCollumns = [...collumns];
  const showCars = isLoading ? classes.hidden : '';
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.container}>
        <Dropdown
          className={cn(dropDownCN.dropdownClass)}
          placeholderClassName={dropDownCN.placeholderClass}
          controlClassName={dropDownCN.controlClass}
          menuClassName={dropDownCN.menuClass}
          options={options}
          onChange={(val) => {
            getCars(val.value);
          }}
          value={defaultOption}
          placeholder="Марка"
        />
      </div>

      <div className={cn(classes.marketDesk_row, showCars)}>
        {cloneCollumns.map((column, indexCol) => {
          return (
            <div className={classes.marketDesk_col} key={indexCol}>
              {column.map((item, indexItem) => {
				//задаем объектам 3 размера S-маленький M-средний L-увеличенный
                let type = 'L'; 
                if (indexCol === 0 && indexItem === 0) type = 'M';
                if (indexCol === cloneCollumns.length - 1 && indexItem === column.length - 1) type = 'S';

                return <Cart key={item._id} auto={item} type={type} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Market;
