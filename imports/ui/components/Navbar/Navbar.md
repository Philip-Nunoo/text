Navbar example:

```js
<Navbar>
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
    <Navbar.Toggler />
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Nav className="ml-auto" navbar>

        </Nav>
    </div>
</Navbar>
```

### Brand

```js
<div>
    {/*As a link*/}
    <Navbar color="light" light>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Navbar.Toggler />
    </Navbar>
    <br/>
    {/*As a heading*/}
    <Navbar color="light" light>
        <Navbar.Toggler />
        <Navbar.Brand tag="span" className="mb-0 h1">Navbar</Navbar.Brand>
    </Navbar>
</div>
```

### Nav
```js
<div>
    <Navbar color="dark" dark>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Nav className="ml-auto" navbar>
            <Nav.Item>
                <Nav.Link active>
                    Active
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    Link
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    Link
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
    <br/>
    <Navbar color="light" light>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Nav className="mr-auto" navbar>
            <Nav.Item>
                <Nav.Link active>
                    Active
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    Link
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    Link
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
</div>
```

### Color Schemes

Dark
```js
<Navbar dark color="dark">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
    <Navbar.Toggler />
</Navbar>
```

Light
```js
<Navbar light color="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
    <Navbar.Toggler />
</Navbar>
```

### With nav menus
```js
<Navbar dark color="dark">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
    <Navbar.Toggler />
</Navbar>
```