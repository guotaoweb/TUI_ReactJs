        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            unitName: e.currentTarget.value
        })
    }
    onChangeByShortName(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            ext2: e.currentTarget.value
        })
    }
    onChangeByType(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            bizType: e.currentTarget.value
        })
    }
    onChangeByOrginaztion(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            kind: e.currentTarget.value
        })
    }
    onChangeBySt