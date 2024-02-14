package com.sideReview.side.login;

import com.sideReview.side.common.dto.UserInfoDto;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
@Slf4j
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

    /*
     * Intellij 버그로 kotlin에서 java class 접근이 불가능해 부득이하게 java class를 사용함.
     * */
//    private final HttpSession httpSession;
    private final LoginService loginService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginUserAnnotation = parameter.getParameterAnnotation(LoginUser.class) != null;
        boolean isUserClass = UserInfoDto.class.equals(parameter.getParameterType());
        return isLoginUserAnnotation && isUserClass;
    }

    @Override
    public Object resolveArgument(@NotNull MethodParameter parameter,
        ModelAndViewContainer mavContainer,
        @NotNull NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);

        Authentication logAuth = SecurityContextHolder.getContext().getAuthentication();
        if (logAuth != null && logAuth.getPrincipal() instanceof UserInfoDto logInfo) {
            // 이제 userInfoDto를 사용할 수 있음
            log.info("session principal에 저장 : " + logInfo);
        }

        assert servletRequest != null;
        HttpSession session = servletRequest.getSession(false);
        if (session != null) {
            UserInfoDto user = (UserInfoDto) session.getAttribute("user");
            if (user == null) {
                return null;
            }
            if (loginService.authenticateUser(user.getId(), user.getType())) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
