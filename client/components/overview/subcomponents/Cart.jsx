import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as faBrands from '@styled-icons/fa-brands';
import * as boxiconsSolid from '@styled-icons/boxicons-solid'; // boxiconsSolid.Heart WHEN ACTIVATED
import { Link, Heart } from '@styled-icons/boxicons-regular';
import { Email } from '@styled-icons/material-outlined';

// TODO: pass in skus? challenge is render timing

const Cart = ({ style, colorScheme }) => {
  if (style === null) return <div>Loading</div>;

  const { skus } = style;

  const [size, setSize] = useState('');
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [selQuantity, setSelQuantity] = useState(null);
  const [selSku, setSelSku] = useState(null); // may not need if importing skus from parent
  const [options, setOptions] = useState([]);
  const [cart, setCart] = useState([]);

  const [copySuccess, setCopySuccess] = useState(''); // copy link state

  useEffect(() => {
    const array = [];
    for (let i = 1; i < maxQuantity + 1; i++) {
      array.push(i);
      if (i >= 15) { break; }
    }
    setOptions(array);
  }, [maxQuantity]);

  function addToCart(/* SKU, QTY */) { // TODO: connect to Cart API
    const newCart = cart.slice();
    const addItem = {};
    addItem.item = size;
    addItem.quantity = selQuantity;
    newCart.push(addItem);
    setCart(newCart);
  }

  function copyToClipboard(e) {
    navigator.clipboard.writeText('http://34.208.75.214/');
    setCopySuccess('Copied!');
  }

  const socialMessage = 'Check%20out%20my%20slick%20new%20kicks%20from%20FEC%20Group%203%20at%3A%20http%3A%2F%2F34.208.75.214';

  return (
    <form data-testid="Cart">

      <Dropdowns>
        {/* Size Selector Dropdown */}
        <Select
          data-testid="sizeDropdown"
          name="sizeDropdown"
          /* value={selSku} */
          onChange={(e) => {
            setMaxQuantity(Number(event.target.selectedOptions[0].getAttribute('quantity')));
            setSize(e.target.value);
            setSelQuantity(1);
          }}
        >
          <option value="">Select Size</option>
          {Object.entries(skus).map(([key, value]) => (
            <option key={key} value={value.size} quantity={value.quantity}>{value.size}</option>
          ))}
        </Select>

        {/* Quantity Selector */}
        {size === ''
          ? (
            <Select data-testid="quantityDropdown" disabled>
              <option value="">-</option>
            </Select>
          )
          : (
            <Select
              data-testid="quantityDropdown"
              name="sizeDropdown"
              onChange={(e) => {
                setSelQuantity(Number(e.target.value));
              }}
            >
              {options.map((num) => (
                <option value={num} key={num}>{num}</option>
              ))}
            </Select>
          )}
      </Dropdowns>

      {/* Add to Cart button */}
      <Buttons>
        <Button data-testid="btnAddToCart" onClick={(e) => { e.preventDefault(); addToCart(); }} colorScheme={colorScheme}>Add to Cart</Button>
        <Button data-testid="btnStar" onClick={(e) => { e.preventDefault(); }} colorScheme={colorScheme}><Heart size="12px" /></Button>
      </Buttons>

      {/* Share on Social Media */}
      <Socials colorScheme={colorScheme}>
        {/* Facebook, Twitter, Pinterest = min required */}

        <Icon as="a" target="_blank" colorScheme={colorScheme} href="https://www.facebook.com/sharer/sharer.php?u=http://34.208.75.214/"><faBrands.Facebook data-testid="icon-facebook" size="36" /></Icon>
        <Icon as="a" target="_blank" colorScheme={colorScheme} href={`https://twitter.com/intent/tweet?text=${socialMessage}`}><faBrands.Twitter data-testid="icon-twitter" size="36" /></Icon>
        <Icon as="a" target="_blank" colorScheme={colorScheme} href={`https://pinterest.com/pin/create/link/?url=${socialMessage}`}><faBrands.Pinterest data-testid="icon-pinterest" size="36" /></Icon>
        {/* <Icon><faBrands.Instagram size="36" /></Icon> */}
        {/* <Icon><faBrands.Whatsapp size="36" /></Icon> */}
        <Icon as="a" target="_blank" colorScheme={colorScheme} href={`mailto:?subject=Hello!&body=${socialMessage}`} colorScheme={colorScheme}><Email size="36" /></Icon>
        <Icon onClick={copyToClipboard} colorScheme={colorScheme}><Link size="36" /></Icon>
        <span>{copySuccess}</span>
      </Socials>

    </form>
  );
};

const Dropdowns = styled.div`
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  flex: 1 0 100%;
  margin-right: 8px;
`;

const Select = styled.select`
  border: 1px solid black;
  margin-right: 16px;
  background: white;
  padding: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const Button = styled.button`
  border: 1px solid black;
  margin-top: 16px;
  margin-right: 16px;
  padding: 16px;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  color: ${(props) => (props.colorScheme ? 'whitesmoke' : 'black')};
  background: ${(props) => (props.colorScheme ? 'purple' : 'orange')};
  &:hover{ cursor: pointer; background: ${(props) => (props.colorScheme ? '#a64ca6' : '#ffc04c')}; }
  &:active{ cursor: pointer; background: ${(props) => (props.colorScheme ? '#660066' : '#cc8400')}; }
`;

const Socials = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 8px 0;
  margin: 0;
  align-items: center;
  color: ${(props) => (props.colorScheme ? 'whitesmoke' : 'orange')};
`;

const Icon = styled.span`
  margin: 10px 16px 0 0;
  &:visited{ text-decoration: none; color: ${(props) => (props.colorScheme ? 'whitesmoke' : 'orange')}; };
  &:link{ text-decoration: none; color: ${(props) => (props.colorScheme ? 'whitesmoke' : 'orange')}; };
  &:hover{ cursor: pointer; color: ${(props) => (props.colorScheme ? '#a64ca6' : '#ffbf00')}; };
  &:active{ cursor: pointer; color: ${(props) => (props.colorScheme ? '#660066' : '#cc8400')};};
  color: ${(props) => (props.colorScheme ? 'whitesmoke' : 'orange')};
`;

export default Cart;
