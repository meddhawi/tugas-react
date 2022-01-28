
import React, { Component } from 'react'
import NumberFormat from "react-number-format";

import {
    Form,
    Container,
} from 'react-bootstrap'

class Calculator extends Component{
    constructor(props){
        super(props);

        this.state={
            targetDana: '',
            danaTersedia: '',
            durasiInves: '',
            asumsiTumbuh: '',
            targetDanaTahun: '',
            simpanDanaTahun: '',
            kekurangan: '',
            danaSimpanBulan: ''

        }
        this.task = this.task.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    
    task(danaTersedia, durasiInves, asumsiTumbuh){
        var danaTersediaInt = parseInt(danaTersedia.replace(/,/g, ""))
        var durasiInvesInt = parseInt(durasiInves)
        var asumsiTumbuhInt = parseInt(asumsiTumbuh)

        var x = danaTersediaInt * durasiInvesInt;
        var profit = danaTersediaInt * (asumsiTumbuhInt/100 )* 12;

        var targetDanaXTahun = x + profit;
        var simpanDanaXTahun = targetDanaXTahun - profit;
        var kekurangan = simpanDanaXTahun - danaTersediaInt;
        var danaSimpanBulan = (kekurangan/12)/12;

        var taskResult = {
            targetDanaXTahun: targetDanaXTahun,
            simpanDanaXTahun: simpanDanaXTahun,
            kekurangan: kekurangan,
            danaSimpanBulan: danaSimpanBulan
        }

        return taskResult
    }

    handleInputChange(event){
        event.preventDefault();
        console.log(event.target.name + " :" + event.target.value)
        console.log(typeof(event.target.value))
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        
        var result = this.task(this.state.danaTersedia, this.state.durasiInves, this.state.asumsiTumbuh)

        this.setState({
            targetDanaTahun: result.targetDanaXTahun,
            simpanDanaTahun: result.simpanDanaXTahun,
            kekurangan: result.kekurangan,
            danaSimpanBulan: result.danaSimpanBulan
        })
    }

    render(){
        return(
            <div className='d-flex'>
                <Container className='border border-primary rounded p-3 m-2 text-end'>
                    <Form onSubmit={this.handleSubmit}>
                        <div className='row mt-2 m-1'>
                            <div className='col-7'>
                                <Form.Label>Target Dana Investasi Yang Anda Inginkan</Form.Label>
                            </div>
                            <div className='col-5'>
                                <div className='input-group'>
                                    <NumberFormat
                                        className='form-control col-10'
                                        thousandSeparator={true}
                                        name='targetDana'
                                        value={this.state.value}
                                        onChange={this.handleInputChange}
                                    />
                                    
                                    <span className="input-group-addon text-center p-1">IDR</span>
                                </div>
                            </div>
                        </div>
                        

                        <div className='row m-1'>
                            <div className='col-7'>
                                <Form.Label>Dana Awal yang Tersedia</Form.Label>
                            </div>
                            <div className='col-5'>
                                <div className='input-group'>
                                <NumberFormat
                                        className='form-control col-10'
                                        thousandSeparator={true}
                                        name='danaTersedia' 
                                        value={this.state.value}
                                        onChange={this.handleInputChange}
                                    />
                                    <span className="input-group-addon col-2 text-center p-1">IDR</span>
                                </div>
                            </div>
                        </div>

                        <div className='row m-1'>
                            <div className='col-7'>
                                <Form.Label>Jangka Waktu Investasi</Form.Label>
                            </div>
                            <div className='col-5'>
                                <div className='d-flex'>
                                    <span className="">
                                        <input type="text" className='form-control' 
                                        name='durasiInves' 
                                        value={this.state.value}
                                        onChange={this.handleInputChange}/>
									</span>
                                    <span className='col-xs-7 col-sm-6 col-md-5'>
                                        <select className="form-select">
											<option value="Tahun">Tahun</option>
										</select>
                                    </span>
                                </div>
                                

                            </div>
                        </div>

                        <div className='row m-1'>
                            <div className='col-7'>
                                <Form.Label>Asumsi Tingkat Pertumbuhan Investasi</Form.Label>
                            </div>
                            <div className='col-5'>
                                <div className='d-flex'>
                                    <div className="">
                                        <input type="text" className='form-control col-5' 
                                        name='asumsiTumbuh' 
                                        value={this.state.value}
                                        onChange={this.handleInputChange}/>
									</div>
                                    <div className='col-xs-7 col-sm-6 col-md-5'>
                                        <select className="form-select">
											<option value="Tahun">%/Tahun</option>
										</select>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <input type="submit" value="Submit" onClick={this.handleSubmit} className='btn btn-success m-3'/>
                    </Form>
                </Container>

                <Container className='border border-primary rounded p-3 m-2'>
                    <h5 className='text-center'>Kesimpulan</h5>

                    <div className='row mt-2 m-1'>
                        <div className='col-7'>
                            <Form.Label>Target Dana Investasi {this.state.durasiInves} Tahun Kemudian</Form.Label>
                        </div>
                        <div className='col-5'>
                            <div className='input-group'>
                                <NumberFormat
                                    className='form-control col-10'
                                    thousandSeparator={true}
                                    value={this.state.targetDanaTahun} 
                                    disabled/>
                                <span className="input-group-addon col-2 text-center p-1">IDR</span>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2 m-1'>
                        <div className='col-7'>
                            <Form.Label>Simpanan Dana Awal Selama {this.state.durasiInves} Tahun</Form.Label>
                        </div>
                        <div className='col-5'>
                            <div className='input-group'>
                                <NumberFormat
                                    className='form-control col-10'
                                    thousandSeparator={true}
                                    value={this.state.simpanDanaTahun} 
                                    disabled/>
                                <span className="input-group-addon col-2 text-center p-1">IDR</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <br/>
                    <div className='row mt-2 m-1'>
                        <div className='col-7'>
                            <Form.Label>Kekurangan Dana</Form.Label>
                        </div>
                        <div className='col-5'>
                            <div className='input-group'>
                                <NumberFormat
                                    className='form-control col-10'
                                    thousandSeparator={true}
                                    value={this.state.kekurangan} 
                                    disabled/>
                                <span className="input-group-addon col-2 text-center p-1">IDR</span>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2 m-1'>
                        <div className='col-7'>
                            <Form.Label>Dana Yang Harus Mulai Disisihkan per Bulan</Form.Label>
                        </div>
                        <div className='col-5'>
                            <div className='input-group'>
                                <NumberFormat
                                    className='form-control col-10'
                                    thousandSeparator={true}
                                    value={this.state.danaSimpanBulan} 
                                    disabled/>
                                <span className="input-group-addon col-2 text-center p-1">IDR</span>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2 m-1'>
                        <div className='col-7'>
                            <Form.Label>Asumsi Tingkat Pertumbuhan Investasi</Form.Label>
                        </div>
                        <div className='col-5'>
                            <div className='input-group'>
                                    <NumberFormat
                                        className='form-control col-10'
                                        thousandSeparator={true}
                                        name='targetDana'
                                        value={parseFloat(this.state.asumsiTumbuh)} 
                                        onChange={this.handleInputChange}
                                        disabled
                                    />
                                
                                <div className='col-xs-7 col-sm-6 col-md-5'>
									<span className='form-control'>%/Tahun</span>		
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </Container>
            </div>
        )
    }

}

export default Calculator