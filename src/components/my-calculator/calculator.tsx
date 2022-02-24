import { Component,Element,State, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-calculator',
  styleUrl: 'calculator.css',
  shadow: true,

})
export class Calculator {
  @Prop({reflect:true}) brand: string; // Cambiar y actualizar el título y su atributo. 

  @Prop() valor: string;
  @State() display: string;

  
  @Element() el: HTMLElement;

  componentDidLoad() {
    const buttons = Array.from(this.el.shadowRoot.querySelectorAll('button'));
    buttons.forEach(button => button.addEventListener('click', this.showConsole));
    
    console.log('Componente cargado')
  }
  
 
  showConsole(event: Event) {
    this.valor = ((event.target as HTMLInputElement).value)
    console.log(this.valor)
  }
  
  
  render() {
   
    return [
     
      <div class="calculator">
        <header class="calculator__display">
          <h2 class="calculator__title">{this.brand}</h2>
          <div class="calculator__screen">
              <span class="screen-value" data-role="display" >{this.valor}</span>
          </div>
        </header>

        <section class="buttons grid">
          <button class="orange" value="ac">AC</button>
          <button class="orange" value="ce">ce</button>
          <button value="/">÷</button>
          <button value="*">x</button>

          <button value="7">7</button>
          <button value="8">8</button>
          <button value="9">9</button>
          <button value="-">-</button>

          <button value="4">4</button>
          <button value="5">5</button>
          <button value="6">6</button>
          <button value="+">+</button>

          <button value="1">1</button>
          <button value="2">2</button>
          <button value="3">3</button>
          <button class="equals" value="=">=</button>

          <button class="zero" value="0">0</button>
          <button value=".">.</button>
        </section>
      </div>

    ];
  }
  
}