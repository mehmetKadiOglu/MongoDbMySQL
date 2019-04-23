<?php
class BindParam{ 
    private  $bind = ""; 
    private  $BindDizi = []; 
    private  $a_params = []; 

    public  function setBindDizi($sorguElemanDizi)
    {

        $this->BindDizi = array();
        $this->BindDizi = $sorguElemanDizi; 
    } 

    public  function setBind() 
    {
        $this->bind = "";
        for ($i=0; $i < count($this->BindDizi) ; $i++) 
        $this->bind.="s";
    }

    public function setA_params()
    {

        $this->a_params = array();
        $this->a_params[] = &$this->bind;

        for ($i=0; $i < count($this->BindDizi); $i++)
            $this->a_params[] = &$this->BindDizi[$i];
        
    }

    public  function getA_params(){
        return $this->a_params;
    }
}
?>