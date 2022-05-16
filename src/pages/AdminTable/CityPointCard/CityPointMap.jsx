import React from 'react';
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
  SearchControl,
} from 'react-yandex-maps';
import { YMAPS_API } from '../../../config';
 export default class CityPointMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point: '',
    };
    this.ymaps = null;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onLoadMap(ymaps) {
    this.ymaps = ymaps;
  }

  goToErrorPage() {
    this.props.history.push('/adminPanel/errorpage');
  }

  onClickHandler(event) {
    this.props.handler('');
    const coords = event.get('coords') || event.get('request');
    this.ymaps
      .geocode(coords, {
        json: true,
        results: 1,
      })
      .then((res) => {
        const newPoint =
          res.GeoObjectCollection.featureMember[0].GeoObject;
        this.setState({ point: newPoint, coords: newPoint.Point.pos });
        if (newPoint.metaDataProperty.GeocoderMetaData.kind === 'house') {
          this.props.handler(newPoint);
        }
        this.map.setCenter(newPoint.Point.pos.split(' ', 2).reverse(), [
          17,
        ]);
      });
  }

  render() {
    const params = {
      ns: 'use-load-option',
      apikey: YMAPS_API,
    };
    const modules = ['geolocation', 'geocode', 'geoObject.addon.hint'];
    return (
      <YMaps query={params} className='map'>
        <Map
          instanceRef={(map) => (this.map = map)}
          width='100%'
          height='100%'
          onError={(err) => {
            this.goToErrorPage();
}}
          onLoad={(ymaps) => {
            this.onLoadMap(ymaps);
          }}
          onClick={this.onClickHandler}
          defaultState={{
            center: [54.299777, 48.373667],
            zoom: 14,
          }}
          modules={modules}
        >
          {this.state.point && (
            <Placemark
              geometry={this.state.point.Point.pos.split(' ', 2).reverse()}
              options={{
                preset: 'islands#autoCircleIcon',
                iconColor: 'rgb(0 123 255)',
                iconShadow: true,
              }}
              properties={{
                iconCaption:
                  this.state.point.name +
                  ' ' +
                  this.state.point.description,
              }}
            />
          )}
          <ZoomControl options={{ float: 'right' }} />
          <FullscreenControl />
          <SearchControl
            onSubmit={this.onClickHandler}
            options={{ float: 'right', noPlacemark: true }}
          />
        </Map>
      </YMaps>
    );
  }
};
