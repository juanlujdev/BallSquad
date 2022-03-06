package com.mycompany.myapp.web.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-02-22T12:16:09.563278+01:00[Europe/Paris]")
@RestController
@RequestMapping("${openapi.backend.base-path:/v3}")
public class PetApiController implements PetApi {

    private final PetApiDelegate delegate;

    public PetApiController(@org.springframework.beans.factory.annotation.Autowired(required = false) PetApiDelegate delegate) {
        this.delegate = Optional.ofNullable(delegate).orElse(new PetApiDelegate() {});
    }

    @Override
    public PetApiDelegate getDelegate() {
        return delegate;
    }

}
