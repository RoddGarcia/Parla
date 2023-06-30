package com.parla.parla;

import java.util.Arrays;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class CookieService {
	// response: gravar o cookie
	public static void setCookie(HttpServletResponse response, String key, String value, int seconds) {
		
		Cookie cookie = new Cookie(key, value);
		
		// cookie duration (in seconds)
		cookie.setMaxAge(seconds);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		
		cookie.setSecure(true);
		
		response.addCookie(cookie);
	}
	
	public static String getCookie(HttpServletRequest request, String key) {
		
		return Optional.ofNullable(request.getCookies()) // verficiar se o cookie não é nulo, se for, retorna vazio
				.flatMap(cookies -> Arrays.stream(cookies) // fazer uma busca dessas informações, pegando os cookies parciados
						.filter(cookie -> key.equals(cookie.getName())) // verifica se key tem nome igual ao nome do cookie gravado
						.findAny()).map(e -> e.getValue()) // retorna null ou o valor do cookie
							.orElse(null); 
	}
}
