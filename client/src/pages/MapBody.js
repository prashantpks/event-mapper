import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState, useRef, Fragment, useEffect } from 'react';
import Geocoder from 'react-map-gl-geocoder';
import MapPin from '../components/MapPin';
import AddEventForm from '../components/AddEventForm';
import { getEventList } from '../api/EventApi';
import EventDetailPopup from '../components/EventDetailPopup';
import { useIsMounted } from '../hooks/useIsMounted';


function MapBody(props) {
  const [viewport, setViewport] = useState({
    width: "100wh",
    height: "100vh",
    latitude: 27.7577,
    longitude: 85.3231324,
    zoom: 7,
  })
  const { startDate, endDate } = props;
  const [showPopup, setShowPopup] = useState({});
  const [addEventLocation, setAddEventLocation] = useState(null);
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const [data, setData] = useState([]);
  const isMounted = useIsMounted();


  const getEvents = async () => {
    const events = await getEventList(startDate, endDate);
    // console.log(events);
    if (isMounted.current) setData(events);
  }

  useEffect(() => {
    document.title = "Eventor | Home";
    getEvents();
    //eslint-disable-next-line
  }, [startDate, endDate])



  const showMarkerPopup = (e) => {
    console.log(e.lngLat);
    const [longitude, latitude] = e.lngLat;
    setAddEventLocation({
      longitude,
      latitude,
    });
  };

  return (

    <div className="map-body">
      <ReactMapGL mapboxApiAccessToken={props.act}
        mapStyle="mapbox://styles/prashantpks/ckye22n1y0hd315pb9ns8mgl3"
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={showMarkerPopup}
        doubleClickZoom={false}

        ref={mapRef}
      >
        <div
          ref={geocoderContainerRef}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
        ></div>

        {data.map((event) => {
          return <Fragment key={event._id}><Marker key={event._id} longitude={event.longitude} latitude={event.latitude} >
            <div onClick={() => { setShowPopup({ [event._id]: true, }) }}><MapPin></MapPin></div>
          </Marker>
            {showPopup[event._id] ? (
              <Popup
                latitude={event.latitude}
                longitude={event.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={false}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <EventDetailPopup event={event}></EventDetailPopup>
              </Popup>
            ) : null}
          </Fragment>
        })}

        {addEventLocation ? (<>
          <Marker longitude={addEventLocation.longitude} latitude={addEventLocation.latitude}>
            <div><MapPin></MapPin></div>
          </Marker>
          <Popup
            latitude={addEventLocation.latitude}
            longitude={addEventLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={false}
            onClose={() => {
              setAddEventLocation(null);
              getEvents();
            }}
            anchor="top" >
            <div><AddEventForm latitude={addEventLocation.latitude} longitude={addEventLocation.longitude}></AddEventForm></div>
          </Popup>

        </>) : null}

        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxApiAccessToken={props.act}
          position="top-left"
        />
      </ReactMapGL>

    </div>
  )
}

export default MapBody
