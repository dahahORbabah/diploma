import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Course, Work, User, Student, Teacher } from '../../../types/types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Badge } from '../Badge/Badge';

interface Props {
    menuItems: Course[];
}

const { SubMenu, Item } = AntdMenu;

@inject('userStore')
@observer
export class Menu extends React.Component<Props | any> {

    @observable user!: User | Teacher | Student;

    componentDidMount() {
        this.user = this.props.userStore.getUser();
    };

    private renderCourseName = (name: string): React.ReactNode => {
        return (
            <span>
                <ArrowRightOutlined />
                <Badge
                    content={<span>{name}</span>}
                    dot
                    offset={[10, 0]}
                    // status
                    // title
                />
            </span>
        );
    };

    private renderItems = (course: Course): React.ReactNode => {
        if (course.works && this.props.userStore.user) {
            return (
                course.works.map((work: Work) => 
                    <Item key={work.id}>
                        <Link
                            to={`/user/${this.props.userStore.user.id}/courses/${course.id}/works/${work.id}`}
                        >
                            {/* mock add status */}
                            <Badge 
                                content={work.title} 
                                dot 
                                offset={[10, 0]}
                                // status
                                // title
                            />
                        </Link>
                    </Item>
                )
            );
        } else return null;
    };

    private renderMenuItems = (): React.ReactNode => {
        const { menuItems } = this.props;        
        if (menuItems && this.props.userStore.user) {
            return (
                menuItems.map((menuItem: Course) => 
                    <SubMenu
                        key={menuItem.id}
                        title={
                            <Link to={`/user/${this.props.userStore.user.id}/courses/${menuItem.id}`}>
                                {this.renderCourseName(menuItem.name)}
                            </Link>
                        }
                    >
                        {this.renderItems(menuItem)}
                    </SubMenu>
                )
            );
        } else {
            return null;
        }
    };

    render(): React.ReactChild {
        return (
            <AntdMenu
                mode='inline'
                theme='light'
                multiple={false}
                selectable={true}
            >
                {this.renderMenuItems()}
            </AntdMenu>
        );
    }
}