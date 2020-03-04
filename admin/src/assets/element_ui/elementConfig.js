import {
        Rate,
        Row,
        Col,
        Button,
        Tag,
        Container,
        Header,
        Aside,
        Main,
        Menu,
        Submenu,
        MenuItem,
        MenuItemGroup,
        Table,
        TableColumn,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Pagination,
        Input,
        Upload,
        Dialog,
        Tooltip,
        Message,
        MessageBox,
        Breadcrumb,
        BreadcrumbItem,
        RadioGroup,
        RadioButton,
        Link
  } from 'element-ui'
  
  export default {
    install (V) {
        V.use(Rate)
        V.use(Button)
        V.use(Tag)
        V.use(Row)
        V.use(Col)
        V.use(Container)
        V.use(Header)
        V.use(Aside)
        V.use(Main)
        V.use(Menu)
        V.use(Submenu)
        V.use(MenuItem)
        V.use(MenuItemGroup)
        V.use(Table)
        V.use(TableColumn)
        V.use(Dropdown)
        V.use(DropdownMenu)
        V.use(DropdownItem)
        V.use(Pagination)
        V.use(Input)
        V.use(Upload)
        V.use(Dialog)
        V.use(Tooltip)
        V.use(Breadcrumb)
        V.use(BreadcrumbItem)
        V.use(RadioGroup)
        V.use(RadioButton)
        V.use(Link)

        V.prototype.$msgbox = MessageBox
        V.prototype.$alert = MessageBox.alert
        V.prototype.$confirm = MessageBox.confirm
        V.prototype.$message = Message
    }
  }