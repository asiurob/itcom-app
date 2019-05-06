import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin.service';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit {

  private charty: any;
  constructor(
    public _bitcoin: BitcoinService
  ) { }

  ngOnInit() {

    // CREAMOS LA GRÁFICA INICIAL
    this.charty = Highcharts.chart('chart', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Precio del bitcoin'
      },
      xAxis: {
          allowDecimals: false,
          categories: [],
          labels: {
            useHTML: true
          }
      },
      yAxis: {
          title: {
              text: 'Costo'
          },
          min: 105000,
          labels: {
              formatter: function () {
                  return this.value / 1000 + ' k';
              }
          }
      },
      tooltip: {
          pointFormat: 'Precio del {series.name} <b>${point.y:,.0f}</b>'
      },
      plotOptions: {
          area: {
              marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [{
          name: 'Bitcoin',
          data: []
      }]
  });

  // INVOCAMOS EL API CON 1 HORA POR DEFAULT
  this.changeData( '1' );
  }

  // ESCUCHAR EVENTO CUANDO SE CAMBIE EL SELECT E IR POR LA INFORMACIÓN
  changeData( value: String ) {
    if ( !value && value.trim() === '' ) {
      return;
    }

    this._bitcoin.BitcoinData( value ).subscribe(
      ( res: any ) => this.updateData( res.newData, value )
    );
  }

  // CUANDO SEA RECIBIDA CON UN STATUS 200, SERÁ PROCESADA Y SE ACTUALIZARÁ LA GRÁFICA
  updateData( data: Array<any>, value: String ) {

    const set = new Set( data.map( JSON.stringify ) );
    const nodupe = Array.from( set ).map( JSON.parse );

    const series: Array<any> = nodupe.map( ( val: any ) => Number( val.bit_price ) );
    const labels: Array<any> = nodupe.map( ( val: any ) => this.dateToString( val.added_date ) );



    this.charty.series[0].update({
      pointStart: 0,
      data: series
    }, false);

    this.charty.xAxis[0].update({
      categories: labels
    }, false);

    this.charty.redraw();
  }

  // CONVERTIR ISOFORMAT A UNA FECHA LEGIBLE
  dateToString( date: string )  {
    const d = new Date( date ),
    hour    = d.getHours(),
    minute  = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return `${hour}:${minute}`;
  }

}
