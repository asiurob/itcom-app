import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starwars-cover',
  templateUrl: './starwars-cover.component.html',
  styleUrls: ['./starwars-cover.component.css']
})
export class StarwarsCoverComponent implements OnInit {
  private wwidth:  any = window.innerWidth;
  private wheight: any = window.innerHeight;
  private timeout: any;
  constructor() { }

  ngOnInit() {

    // CREAR ESTRELLAS
    const stars = 200;
    let   count = 0;

    while ( count < stars ) {
      const star = document.createElement('div'),
            pos  = this.randomPosition();
      star.className = 'star';
      star.style.top  = `${ pos.top }px`;
      star.style.left = `${ pos.left }px`;
      document.getElementsByClassName('black-cover')[0].append( star );
      count++;
    }

    this.starlight();
    setTimeout( () => { this.stopAnimation(); }, 12000 );
  }

  // OBTENER UNA POSICIÓN PARA LAS ESTRELLAS
  randomPosition (): any {
    return {
      top: Math.floor( Math.random() * this.wheight ),
      left:  Math.floor( Math.random() * this.wwidth )
    };
  }

  // ANIMACIÓN ESTRELLAS BRILLANDO
  starlight() {
    const star = document.getElementsByClassName('star')[
      Math.floor( Math.random() * ( document.getElementsByClassName('star').length - 1 ) )
    ];
    star.classList.add('starlight');
    this.timeout = setTimeout( () => {
      star.classList.remove('starlight');
      this.starlight();
    }, 250 );
  }

  // QUITA EL INTRO DE STARWARS PARA DAR ENTRADA A LA GRAFICA
  stopAnimation() {
    clearTimeout( this.timeout );
    if ( document.getElementsByClassName('black-cover')[0] ) {
      document.getElementsByClassName('black-cover')[0].classList.add('fadeOut');
      setTimeout( () => { document.getElementsByClassName('black-cover')[0].remove(); }, 1000 );
    }
  }

}
