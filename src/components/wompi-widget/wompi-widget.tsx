import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const WompiWidget = () => {

    const containerRef = useRef<HTMLDivElement>(null);

  const totalAmount: number = useSelector((state: RootState) => state.cart.totalAmount);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    
    const script = document.createElement('script');

    /*
        Este widget va a fallar al abrirse debido a las credenciales que les estoy
        pasando, estoy pasando una de las documentación, me creé una cuenta personal
        en Wompi pero solo me dejaba seleccionar el plan Avanzado y no pude continuar los pasos
        por temas de as cuentas bancarias que piden.

        Sin embargo aquí dejé la lógica para que el widget puedise mostrarse.
    */
    script.src = 'https://checkout.wompi.co/widget.js';
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', 'pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH');
    script.setAttribute('data-currency', 'COP');
    script.setAttribute('data-amount-in-cents', String(totalAmount));
    script.setAttribute('data-reference', '4XMPGKWWPKWQ');
    script.setAttribute('data-signature:integrity', '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5');
    
    containerRef.current.appendChild(script);

    return () => {
        if (containerRef.current) {
            containerRef.current.removeChild(script);
        }
    };
  }, []);

  return (
    <form>
      <div ref={containerRef}></div>
    </form>
  );
};

export default WompiWidget;
