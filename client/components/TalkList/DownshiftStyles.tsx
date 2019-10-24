import styled from "styled-components";
import React from 'react'

const Item = styled.li(
    {
      font: '400 13.3333px Arial',
      position: 'relative',
      cursor: 'pointer',
      display: 'block',
      border: 'none',
      height: 'auto',
      textAlign: 'left',
      borderTop: 'none',
      lineHeight: '1em',
      color: 'rgba(0,0,0,.87)',
      textTransform: 'none',
      fontWeight: 400,
      boxShadow: 'none',
      padding: '12px 16px',
      whiteSpace: 'normal',
      wordWrap: 'normal',
      marginBottom: 0,
    },
    /*({isActive, isSelected}) => {
      const styles = []
      if (isActive) {
        styles.push({
          color: 'rgba(0,0,0,.95)',
          background: 'rgba(0,0,0,.03)',
        })
      }
      if (isSelected) {
        styles.push({
          color: 'rgba(0,0,0,.95)',
          fontWeight: '700',
        })
      }
      return styles
    },*/
  )
const onAttention = '&:hover, &:focus'
const Input = styled.input(
    {
      width: '100%', // full width - icon width/2 - border
      wordWrap: 'break-word',
      outline: 0,
      whiteSpace: 'normal',
      background: '#fff',
      display: 'inline-block',
      color: 'rgba(0,0,0,.87)',
      boxShadow: 'none',
      border: '1px solid rgba(34,36,38,.15)',
      transition: 'box-shadow .1s ease,width .1s ease',
      [onAttention]: {
        borderColor: '#96c8da',
        boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
      },
    },
    /*({isOpen}) =>
      isOpen
        ? {
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            [onAttention]: {
              boxShadow: 'none',
            },
          }
        : null,*/
  )
  
  const Label = styled.label({
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 10,
  })
  
  const Menu = styled.ul(
    {
      padding: 0,
      marginTop: 0,
      position: 'absolute',
      backgroundColor: 'white',
      width: '100%',
      maxHeight: '20rem',
      overflowY: 'auto',
      overflowX: 'hidden',
      outline: '0',
      transition: 'opacity .1s ease',
      boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
      borderColor: '#96c8da',
      borderTopWidth: 0,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderStyle: 'solid',
    },
    /*({isOpen}) => ({
      border: isOpen ? null : 'none',
    }),*/
  )
  
  const ControllerButton = styled.button({
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'pointer',
    width: 32,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  })
  
  function ArrowIcon({isOpen}) {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={16}
        fill="transparent"
        stroke="#333333"
        strokeWidth="1.5px"
        transform={isOpen ? 'rotate(180)' : undefined}
      >
        <path d="M1,6 L10,15 L19,6" />
      </svg>
    )
  }

  function XIcon() {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={12}
        fill="transparent"
        stroke="#333333"
        strokeWidth="1.5px"
      >
        <path d="M1,1 L19,19" />
        <path d="M19,1 L1,19" />
      </svg>
    )
  }
export {
    Menu,
    ControllerButton,
    Input,
    Item,
    ArrowIcon,
    XIcon,
    Label,
  }