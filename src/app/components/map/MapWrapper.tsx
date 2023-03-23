import React, { useEffect, useRef, useState } from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';


export default function MapWrapper() {
  const [map, setMap] = useState<any>();
  const mapElement = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iconStyle = new Style({
    image: new Icon({
      imgSize: [32, 48],
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: "https://openlayers.org/en/latest/examples/data/icon.png",
    }),
    zIndex: 99
  })

  const openTopoMap = new TileLayer({
    source: new XYZ({
      url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
    }),
  });

  useEffect( () => {
    if (mapElement.current && !mapRef.current) {
      const _map = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(), 
          }),
          openTopoMap,
        ],
        view: new View({
          center: proj.fromLonLat([27.59, 64.96]),
                  zoom: 5,
                  minZoom: 1,
                  maxZoom: 50,
                  projection: 'EPSG:3857',
        }),
        controls: []
      });
      mapRef.current = _map

      const vectorSource = new VectorSource({
        features: [],
      });
    
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
    
      mapRef.current.addLayer(vectorLayer);

      mapRef.current.on('click', (event: any) => {
        setOpen(!open)
        const markerFeature = new Feature({
          geometry: new Point(event.coordinate),
        });
        markerFeature.setStyle(iconStyle);
        vectorSource.addFeature(markerFeature);
      })
      setMap(_map)
    }
    
  },[mapRef,mapElement])


  return (
    <>
      <div ref={mapElement} className="map-container" style={{ width: '100%', height: '50vh' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Button>Cancel</Button>
        </Box>
      </Modal>
    </> 
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
