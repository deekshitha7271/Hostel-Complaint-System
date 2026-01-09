const BASE_URL = "http://localhost:5000/api";

//  FETCH complaints
export const fetchComplaints = async (token, query = {}) => {
  const params = new URLSearchParams(query).toString();

  const res = await fetch(`${BASE_URL}/complaints?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch complaints");
  }

  return data;
};

// CREATE complaint
export const createComplaint = async (token, data) => {
  const res = await fetch(`${BASE_URL}/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create complaint");
  }

  return result;
};


export const updateComplaintStatus = async (token, id, status) => {
  const res = await fetch(
    `${BASE_URL}/complaints/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
};
