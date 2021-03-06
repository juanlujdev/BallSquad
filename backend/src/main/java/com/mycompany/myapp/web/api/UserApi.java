/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (5.3.1).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.mycompany.myapp.web.api;

import java.util.List;
import java.time.OffsetDateTime;
import com.mycompany.myapp.service.api.dto.User;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-02-22T12:16:09.563278+01:00[Europe/Paris]")
@Validated
@Api(value = "user", description = "the user API")
public interface UserApi {

    default UserApiDelegate getDelegate() {
        return new UserApiDelegate() {};
    }

    /**
     * POST /user : Create user
     * This can only be done by the logged in user.
     *
     * @param user Created user object (optional)
     * @return successful operation (status code 200)
     */

    @ApiOperation(value = "Create user", nickname = "createUser", notes = "This can only be done by the logged in user.", response = User.class, tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "successful operation", response = User.class) })
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/user",
        produces = { "application/json", "application/xml" },
        consumes = { "application/json", "application/xml", "application/x-www-form-urlencoded" }
    )
    default ResponseEntity<User> createUser(

@ApiParam(value = "Created user object" )   @Valid @RequestBody(required = false) User user) {
        return getDelegate().createUser(user);
    }


    /**
     * POST /user/createWithList : Creates list of users with given input array
     * Creates list of users with given input array
     *
     * @param user  (optional)
     * @return Successful operation (status code 200)
     *         or successful operation (status code 200)
     */

    @ApiOperation(value = "Creates list of users with given input array", nickname = "createUsersWithListInput", notes = "Creates list of users with given input array", response = User.class, tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "Successful operation", response = User.class),

        @ApiResponse(code = 200, message = "successful operation") })
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/user/createWithList",
        produces = { "application/xml", "application/json" },
        consumes = { "application/json" }
    )
    default ResponseEntity<User> createUsersWithListInput(

@ApiParam(value = "" )   @Valid @RequestBody(required = false) List<User> user) {
        return getDelegate().createUsersWithListInput(user);
    }


    /**
     * DELETE /user/{username} : Delete user
     * This can only be done by the logged in user.
     *
     * @param username The name that needs to be deleted (required)
     * @return Invalid username supplied (status code 400)
     *         or User not found (status code 404)
     */

    @ApiOperation(value = "Delete user", nickname = "deleteUser", notes = "This can only be done by the logged in user.", tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 400, message = "Invalid username supplied"),

        @ApiResponse(code = 404, message = "User not found") })
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/user/{username}"
    )
    default ResponseEntity<Void> deleteUser(@ApiParam(value = "The name that needs to be deleted", required = true) @PathVariable("username") String username

) {
        return getDelegate().deleteUser(username);
    }


    /**
     * GET /user/{username} : Get user by user name
     *
     * @param username The name that needs to be fetched. Use user1 for testing.  (required)
     * @return successful operation (status code 200)
     *         or Invalid username supplied (status code 400)
     *         or User not found (status code 404)
     */

    @ApiOperation(value = "Get user by user name", nickname = "getUserByName", notes = "", response = User.class, tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "successful operation", response = User.class),

        @ApiResponse(code = 400, message = "Invalid username supplied"),

        @ApiResponse(code = 404, message = "User not found") })
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/user/{username}",
        produces = { "application/xml", "application/json" }
    )
    default ResponseEntity<User> getUserByName(@ApiParam(value = "The name that needs to be fetched. Use user1 for testing. ", required = true) @PathVariable("username") String username

) {
        return getDelegate().getUserByName(username);
    }


    /**
     * GET /user/login : Logs user into the system
     *
     * @param username The user name for login (optional)
     * @param password The password for login in clear text (optional)
     * @return successful operation (status code 200)
     *         or Invalid username/password supplied (status code 400)
     */

    @ApiOperation(value = "Logs user into the system", nickname = "loginUser", notes = "", response = String.class, tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "successful operation", response = String.class),

        @ApiResponse(code = 400, message = "Invalid username/password supplied") })
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/user/login",
        produces = { "application/xml", "application/json" }
    )
    default ResponseEntity<String> loginUser(@ApiParam(value = "The user name for login") @Valid @RequestParam(value = "username", required = false) String username

,@ApiParam(value = "The password for login in clear text") @Valid @RequestParam(value = "password", required = false) String password

) {
        return getDelegate().loginUser(username, password);
    }


    /**
     * GET /user/logout : Logs out current logged in user session
     *
     * @return successful operation (status code 200)
     */

    @ApiOperation(value = "Logs out current logged in user session", nickname = "logoutUser", notes = "", tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "successful operation") })
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/user/logout"
    )
    default ResponseEntity<Void> logoutUser() {
        return getDelegate().logoutUser();
    }


    /**
     * PUT /user/{username} : Update user
     * This can only be done by the logged in user.
     *
     * @param username name that need to be deleted (required)
     * @param user Update an existent user in the store (optional)
     * @return successful operation (status code 200)
     */

    @ApiOperation(value = "Update user", nickname = "updateUser", notes = "This can only be done by the logged in user.", tags={ "user", })
    @ApiResponses(value = { 

        @ApiResponse(code = 200, message = "successful operation") })
    @RequestMapping(
        method = RequestMethod.PUT,
        value = "/user/{username}",
        consumes = { "application/json", "application/xml", "application/x-www-form-urlencoded" }
    )
    default ResponseEntity<Void> updateUser(@ApiParam(value = "name that need to be deleted", required = true) @PathVariable("username") String username

,

@ApiParam(value = "Update an existent user in the store" )   @Valid @RequestBody(required = false) User user) {
        return getDelegate().updateUser(username, user);
    }

}
