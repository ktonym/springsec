package com.rhino.config;

import com.rhino.TokenHelper;
import com.rhino.auth.RestAuthenticationEntryPoint;
import com.rhino.auth.TokenAuthenticationFilter;
import com.rhino.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by user on 13/11/2017.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private CustomUserDetailsService jwtUserDetailsService;

    @Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    /*@Autowired
    private AuthenticationFailureHandler failureHandler;
    @Autowired
    private AuthenticationSuccessHandler successHandler;*/



    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(jwtUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Autowired
    TokenHelper tokenHelper;

//        @Bean
//        private TokenAuthenticationFilter jwtAuthenticationFilter() throws Exception {
//            return new TokenAuthenticationFilter();
//        }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        List<RequestMatcher> csrfMethods = new ArrayList<>();
        Arrays.asList( "POST", "PUT", "PATCH", "DELETE" )
                .forEach( method -> csrfMethods.add( new AntPathRequestMatcher( "/**", method ) ) );

        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
                //added these two lines 08-Nov-2017
                //.formLogin().failureHandler(failureHandler).successHandler(successHandler).and()
                //added lines [08-Nov-2017] end here
                .authorizeRequests()
                //.antMatchers("/h2-console/**").permitAll()
                .antMatchers(HttpMethod.GET,"/","/*html",
                        "/**/*.html","/**/*.css","/**/*.js","/favicon.ico"
                ).permitAll()
                .antMatchers("/auth/**","/h2-console/**").permitAll()
                .anyRequest().authenticated().and()
                .addFilterBefore(new TokenAuthenticationFilter(tokenHelper,jwtUserDetailsService), BasicAuthenticationFilter.class);
        http.csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST,"/auth/**");
        web.ignoring().antMatchers(HttpMethod.GET,"/","/*.html","/**/*.html","/**/*.js","/**/*.css","/favicon.ico");
    }
}
