import React from 'react';
import { Typography } from 'antd';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Course, Student, Work } from '../../../../types/types';
import { Collapse } from '../../../uui/Collapse/Collapse';
import styles from './MainPage.module.less';
import { BorderlessTableOutlined } from '@ant-design/icons'; 

const { Text } = Typography;

interface Props {
    user: Student;
}

@inject('courseStore')
@observer
export class StudentMainPage extends React.Component<Props | any> {

    @observable courses: Course[] = [];

    componentDidMount() {        
        this.props.courseStore.fetchStudentCourses(this.props.user);
        this.courses = this.props.courseStore.getCourses();        
    };

    private renderNotCompletedWorks = (works: Work[], course: Course): React.ReactNode => {
        return (
            works.map((work: Work) =>
                <Collapse
                    key={work.id}
                    title={`${course.name} - ${work.title}`}
                    content={work}
                    user={this.props.user}
                    courseId={course.id}
                />
            )
        );
    };

    private renderCourses = (): React.ReactNode => {
        return this.courses.map((course: Course) => 
            course.works
            ?   this.renderNotCompletedWorks(course.works, course)
            :   `You already completed all works on ${course.name} course! Great job!`
        );
    };
        
    render(): React.ReactChild {        
        return (
            // wrap main page content in switch
            // by default - MainPage component
            // ability to go to:
            // (dynamic) course, works (only gets) - test later
            // statistic  
            <section>
                <span className={styles.titleWrapper}>
                    <BorderlessTableOutlined />
                    <Text mark strong className={styles.title}>{'Not comleted tasks'}</Text>
                </span>
                {this.renderCourses()}
            </section>
        );
    }
}