import PropTypes from 'prop-types';
import classes from './style/Cart.module.css';
import classesBtn from './style/Btn.module.css';
import cn from 'classnames';
import { useState } from 'react';

import 'swiper/swiper.css'; // core Swiper
const Cart = (props) => {
  const [hover, setHover] = useState(false);
  //объект с необходимой информацией. По хорошему надо сделать селекторы для дальнейшей легкой подмены.
  const auto = {
    mark: props.auto.feedData.brandByClassifierName,
    model: props.auto.feedData.modelName,
    variant: props.auto.feedData.equipmentVariantName,
    vin: props.auto.feedData.vin,
    imgs: props.auto.photobank.imgs,
    transmissionType: props.auto.feedData.equipmentVariantTransmissionType,
    modelYear: props.auto.feedData.modelYear,
    colorByClassifierName: props.auto.feedData.colorByClassifierName,
    FuelType: props.auto.feedData.equipmentVariantFuelType,
    EnginePower: props.auto.feedData.equipmentVariantEnginePower,
    colorName: props.auto.feedData.colorByClassifierName,
    price: props.auto.feedData.autoPrice.toLocaleString('ru-RU'),
    priceAdd: Math.abs(props.auto.feedData.autoPrice - props.auto.feedData.price).toLocaleString('ru-RU'),
    options: props.auto.feedData.options,
    status: props.auto.feedData.status,
    engineСapacity:
      String(props.auto.feedData.engine.engineCapacity).length === 1
        ? `${props.auto.feedData.engine.engineCapacity}.0`
        : props.auto.feedData.engine.engineCapacity,
    carMileage: 100000,
  };
  //не нашел значение пробега и стоимости доп услуг. поэтому пробег 100000, а стоимость доп услуг это модуль разности двух цен.
  const { type } = props;

  const getOptions = () => {
    if (auto.options.length > 0) {
      return (
        <p className={cn(classes.feature_text, classes.flex)}>
          <span className={cn(classes.text_overflow)}>{auto.options[0].name}</span>
          {`${auto.options.length > 1 ? `(+ ещё ${auto.options.length - 1} пакета)` : ''}`}
        </p>
      );
    }
    return <p className={classes.feature_text}>Доп пакетов 0 шт.</p>;
  };

  const getInfo = () => {
    if (type === 'S' && !hover) return;
    const hidenS = type === 'S' ? classes.hidden : '';
    const hidenM = type === 'M' ? classes.hidden : '';
    const hidenL = type === 'L' ? classes.hidden : '';
    const hidenL_open = type === 'L' && hover ? classes.hidden : '';
    const hidenL_close = type === 'L' && !hover ? classes.hidden : '';
    const sizeDempfer = type === 'L' && hover ? classes.feature__dempferSize : '';
    const features_col = hover || type === 'M' ? classes.features_col : '';
    const absolutBlock = hover && type === 'L' ? `${classes.features_move} ${classes.feature_animate}` : '';

    const getEngineСapacity = () => {
      const text = String(auto.engineСapacity) == '0.0' ? '' : `${auto.engineСapacity} л `;
      if (text === '') return '';
      return (
        <>
          {text} <span className={classes.selection_color}>{'/ '}</span>
        </>
      );
    };

    const info = () => {
      return (
        <div className={cn(classes.features, features_col)}>
          <div>
            <div className={classes.feature_container}>
              <p className={classes.feature_title}>Двигатель</p>
              <p className={classes.feature_text}>
                {getEngineСapacity()}
                {`${auto.EnginePower} лс `}
                <span className={classes.selection_color}>/</span> {auto.FuelType}
              </p>
            </div>
            <div className={cn(classes.feature_container, absolutBlock, hidenL)}>
              <p className={classes.feature_title}>КПП</p>
              <p className={classes.feature_text}>{auto.transmissionType}</p>
            </div>
            <div className={cn(classes.dempfer, sizeDempfer)} />
            <div className={classes.feature_container}>
              <p className={classes.feature_title}>Пробег</p>
              <p className={classes.feature_text}>160 500 км</p>
            </div>
          </div>
          <div className={cn(hidenM, hidenS)}>
            <div className={cn(classes.feature_container, absolutBlock)}>
              <p className={classes.feature_title}>КПП</p>
              <p className={classes.feature_text}>{auto.transmissionType}</p>
            </div>
            <div className={cn(classes.feature_container, hidenM, hidenS, hidenL_open)}>
              <p className={classes.feature_title}>Цвет</p>
              <p className={classes.feature_text}>{auto.colorName}</p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <div className={cn(classes.info_block)}>
          {info()}
          <p
            className={cn(classes.price, classes.selection_color, classes.text_right, hidenL_close, classes.price_pos)}
          >
            {auto.price}
            <span>₽</span>
          </p>
        </div>
        <div className={cn(classes.feature_container, hidenM, hidenS, hidenL_open)}>
          <p className={classes.feature_title}>пакеты</p>
          {getOptions()}
        </div>

        <p className={cn(classes.price, classes.selection_color, classes.price_padding, hidenM, hidenS, hidenL_open)}>
          {auto.price}
          <span>₽</span>
        </p>
        <p className={cn(hidenM, hidenS, hidenL_open, classes.minPrise)}>
          Доп. опции на <span className={classes.selection_color}>{auto.priceAdd}</span> ₽
        </p>
      </>
    );
  };

  const getVin = () => {
    if (type === 'S' && !hover) return;
    return <p className={classes.vin}>{auto.vin}</p>;
  };

  const getGalery = () => {
    if (type === 'S' && !hover) return;
    return (
      <div>
        <swiper-container
          slides-per-view="1.5"
          speed="500"
          loop="true"
          css-mode="false"
          simulate-touch="true"
          space-between="70"
        >
          {auto.imgs.map((item, index) => (
            <swiper-slide key={index}>
              <img className={classes.car_image} src={item.url} alt="" />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    );
  };

  const getBtn = () => {
    const preText = auto.status === 'В продаже' ? 'Купить' : 'Купить под заказ';
    const text = !hover ? preText : 'Купить';
    const classPreOrder = auto.status !== 'В продаже' && !hover ? classesBtn.preOrder : '';

    const heartHover = hover ? classesBtn.heart_active : classesBtn.heart_inactive;
    const conteinerClass = type === 'S' && !hover ? classesBtn.btn_pay_container_S : classesBtn.btn_pay_container;
    const hiddenHeart = type === 'S' && !hover ? classes.hidden : '';
    const status = hover ? 'open' : 'close';
    const sizeBtn = classesBtn[`size_btn_${type}_${status}`];
    return (
      <div className={conteinerClass}>
        <img
          className={cn(classesBtn.heart, heartHover, hiddenHeart)}
          src="../../../src/assets/imgs/heart.svg"
          alt="heart"
        />
        <button className={cn(classesBtn.btn_pay, sizeBtn, classPreOrder)}>
          <span className={cn(classesBtn.btn_pay_text)}>{text}</span>
        </button>
      </div>
    );
  };

  const getDempfer = () => {
    const status = hover ? 'open' : 'close';
    const sizeClass = classes[`dempfer_${type}_${status}`];
    return <div className={cn(classes.dempfer, sizeClass)} />;
  };

  const sizeClass = classes[`size_${type}`];
  const aligment = type === 'S' ? classes.aligmen_start : '';
  return (
    <div
      className={cn(sizeClass, classes.cell, aligment)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={cn(classes.cart_container)}>
        <div className={classes.cart_padding}>
          <div className={classes.model_container}>
            <p className={classes.model_name}>{`${auto.mark} ${auto.model} ${auto.variant}`}</p>
            <span className={cn(classes.year, classes.selection_color)}>{auto.modelYear}</span>
          </div>
          {getVin()}
          {getGalery()}
          {getInfo()}
          {getBtn()}
          {getDempfer()}
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  type: PropTypes.string.isRequired,
  auto: PropTypes.object.isRequired,
};

export default Cart;
