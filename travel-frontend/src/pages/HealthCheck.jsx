import { useEffect, useState } from "react";
import axios from "axios";

export default function HealthCheck() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Backend Health Check</h1>

      <pre className="mt-4 bg-gray-100 p-4 rounded text-black">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
