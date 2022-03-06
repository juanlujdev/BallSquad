package com.mycompany.myapp.web.api;

import java.util.Optional;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-02-22T12:16:09.563278+01:00[Europe/Paris]")
@RestController
@RequestMapping("${openapi.backend.base-path:/v3}")
public class UserApiController implements UserApi {

    private final UserApiDelegate delegate;

    public UserApiController(@org.springframework.beans.factory.annotation.Autowired(required = false) UserApiDelegate delegate) {
        this.delegate = Optional.ofNullable(delegate).orElse(new UserApiDelegate() {});
    }

    @Override
    public UserApiDelegate getDelegate() {
        return delegate;
    }

}
