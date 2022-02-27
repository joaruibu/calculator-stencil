import { Component, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-calculator',
  styleUrl: './my-calculator.css',
  shadow: true,
})
export class Calculator {
  @Prop({ reflect: true }) brand: string; // Cambiar y actualizar el título y su atributo.

  @State() value: string;
  @State() pessPoint: boolean = false;
  @State() latestOperations: string[] = [];

  calcValue(value: string) {
    if (value === '=') return this.showValue();

    if (this.buttonsOperation.includes(value)) this.pessPoint = false;

    if (value === 'ce') {
      this.value = this.value.toString().slice(0, this.value.length - 1);
      return;
    }
    if (this.buttonsOperation.includes(value) && this.buttonsOperation.includes(this.value[this.value.length - 1])) return;

    if (this.value) {
      if (value === '.' && this.pessPoint) return;
      this.value = this.value + value;
    } else this.value = '' + value;

    if (value === 'ac') {
      this.value = '';
      this.latestOperations = [];
    }
    if (value === '.') this.pessPoint = true;
  }

  showValue() {
    this.value = eval(this.value);
    this.latestOperations.unshift(this.value.toString());
  }

  buttonsOperation = ['/', '*', '+', '-'];
  buttonsValue = ['ac', 'ce', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'];
  buttonsClass = { 'ac': 'orange', 'ce': 'orange', '0': 'zero', '=': 'equals' };

  render() {
    return [
      <div class="calculator">
        <header class="calculator__display">
          <h2 class="display__title">{this.brand}</h2>
          <div class="display__screen">
            <div class="display__screen__value">
              <span> {this.value} </span>
            </div>
            <div class="display__screen__value display__screen__value--small">
              <span>{this.latestOperations[0]}</span>
            </div>
            <div class="display__screen__value display__screen__value--small">
              <span>{this.latestOperations[1]}</span>
            </div>
          </div>
        </header>

        <section class="buttons grid">
          {this.buttonsValue.map(button => {
            return (
              <button class={this.buttonsClass[button]} value={button} onClick={() => this.calcValue(button)}>
                {button}
              </button>
            );
          })}
        </section>
      </div>,
    ];
  }
}
