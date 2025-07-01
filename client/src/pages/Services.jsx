import React, { useEffect } from 'react';
import FundiCard from '../components/FundiCard';
// import FundiCard from '../components/FundiCard'; // Reused for click + buttons
import { useTheContext } from "../context/Provider"; // import your context hook

const Services = () => {
  // const [services, setServices] = useState([]);
  //const [error, setError] = useState(null);
  const { services, retrieve_services, error } = useTheContext(); 

  // To context

  useEffect(() => {
    retrieve_services();
  }, [retrieve_services]);

  return (
    <div>
      <h1 className="category-title" style={{ marginTop: '50px' }}>Available Services</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="services-wrapper">
        {services.map((service) => (
          <div key={service.id} className="service-block">
            <h2>{service.service_type}</h2>

            {service.service_fundis.length > 0 ? (
              <div className="fundis-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {service.service_fundis.map((fundi) => (
                  <FundiCard
                    key={fundi.id}
                    fundi={{ ...fundi, service: service.service_type }} // Injecting service name
                  />
                ))}
              </div>
            ) : (
              <>
                <p>No fundis available for this service.</p>
                <div>
                  Are you a fundi? <a href="/add-fundi">Create profile</a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;