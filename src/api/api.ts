  
export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "f4d0b4204922e7fe34a9976c7aa25f90";

export const API_KEY_4 =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGQwYjQyMDQ5MjJlN2ZlMzRhOTk3NmM3YWEyNWY5MCIsInN1YiI6IjVmZjA5ODNhNzA2YjlmMDA0MDk4MWUzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gxhiX2y0GALjg1f9QFXw0CMbu6Im5vuLDNeFktcx28";
	
export const apiAuthentication = (url: string = "", option = {}) => {
	return new Promise((resolve, reject) => {
			fetch(url, option)
				.then(response => {
					if(response.status < 400){
						return response.json();
					} else {
						throw response;
					}
					})
					.then(data => resolve(data))
					.catch(response  => {
						response.json().then((error: string) => {
							reject(error);
						});
					})
		})
}