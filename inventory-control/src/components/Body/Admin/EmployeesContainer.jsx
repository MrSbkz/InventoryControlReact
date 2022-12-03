import React from 'react';
import {connect} from 'react-redux';
import Employees from "./Employees";
import AccessError from "../../Common/AccessError";


class EmployeesContainer extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.roles.includes("admin")
                        ? <Employees {...this.props} />
                        : <AccessError/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.authReducer.roles,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer);

