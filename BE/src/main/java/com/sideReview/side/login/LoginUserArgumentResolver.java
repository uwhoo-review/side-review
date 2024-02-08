package com.sideReview.side.login;

import com.sideReview.side.common.dto.UserInfoDto;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

    /*
     * Intellij 버그로 kotlin에서 java class 접근이 불가능해 부득이하게 java class를 사용함.
     * */
    private final HttpSession httpSession;
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
        UserInfoDto user = (UserInfoDto) httpSession.getAttribute("user");
        if (user == null) {
            return null;
        }
        if (loginService.authenticateUser(user.getId(), user.getType())) {
            return user;
        } else {
            return null;
        }
    }
}
