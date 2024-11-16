import { useState, useEffect } from "react";

export const useUserCountry = function () {
	if (typeof window === "undefined") return null;

	const [country, setCountry] = useState<string | null>(
		sessionStorage.getItem("userCountry") || null
	);

	useEffect(() => {
		if (country) return;
		fetch("https://get.geojs.io/v1/ip/country.json")
			.then((res) => res.json())
			.then((data) => {
				if (!data.country) return;
				setCountry(data.country);
				sessionStorage.setItem("userCountry", data.country);
			});
	}, []);

	return country;
};
