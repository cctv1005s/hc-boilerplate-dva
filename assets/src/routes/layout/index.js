import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon} from 'antd';
import {Link, withRouter} from 'dva/router';
import './index.less';


const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

const keyMap = {
  '/': 'file-server',
  '/file-manager': 'file-manager'
};

class OjLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    location: PropTypes.object
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  state = {
    collapsed: false
  }

  render() {
    const {pathname} = this.props.location;
    return (
      <Layout style={{height: '100vh'}}>
        <Header className="header">
          <div className="logo" style={{backgroundImage: `url(${window.CONFIG.prefix}/assets/static/logo.png)`}}>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['app1']}
            style={{lineHeight: '64px', display: 'inline-block'}}
          >
            {
              [
                {
                  key: 'app1',
                  text: 'dva app',
                  link: '/'
                }
              ].map(app => {
                return (
                  <Menu.Item key={app.key}>
                    <a href={app.link}>{app.text}</a>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Header>
        <Layout>
          <Sider
            theme="dark"
            collapsed={this.state.collapsed}
            collapsible
            style={{overflow: 'auto'}}
            trigger={null}
          >
            <div className="collapse-btn" onClick={this.onCollapse}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} theme="outlined" />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[keyMap[pathname]]}
              theme="dark"
            >
              <Menu.Item key="file-server">
                <Link to="/"><Icon type="database" /><span>菜单1</span></Link>
              </Menu.Item>
              <Menu.Item key="file-manager">
                <Link to="/file-manager"><Icon type="file" /><span>菜单2</span></Link>
              </Menu.Item>
              <SubMenu key="sub3" title={<span><Icon type="notification" /><span>子菜单</span></span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{background: '#fff', minHeight: 280}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(OjLayout);
