import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Fade,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Calculate as CalculateIcon,
  AutoAwesome as SparkleIcon,
} from '@mui/icons-material';

const MatrixCalculator = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [matrices, setMatrices] = useState({ sum: null, product: null, result: null });
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const generateMatrices = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const sumMatrix = [];
    const productMatrix = [];

    for (let i = 0; i < rows; i++) {
      sumMatrix[i] = [];
      productMatrix[i] = [];
      for (let j = 0; j < columns; j++) {
        sumMatrix[i][j] = i + j;
        productMatrix[i][j] = i * j;
      }
    }

    setMatrices({ sum: sumMatrix, product: productMatrix, result: null });
    setShowResult(false);
    setIsGenerating(false);
  };

  const addMatrices = async () => {
    if (!matrices.sum || !matrices.product) return;
    
    setIsAdding(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    const resultMatrix = [];
    for (let i = 0; i < rows; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < columns; j++) {
        resultMatrix[i][j] = matrices.sum[i][j] + matrices.product[i][j];
      }
    }

    setMatrices(prev => ({ ...prev, result: resultMatrix }));
    setShowResult(true);
    setIsAdding(false);
  };

  const resetCalculator = () => {
    setMatrices({ sum: null, product: null, result: null });
    setShowResult(false);
  };

  const handleRowChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setRows('');
    } else {
      const numValue = parseInt(value);
      if (numValue >= 1 && numValue <= 10) {
        setRows(numValue);
      }
    }
  };

  const handleColumnChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setColumns('');
    } else {
      const numValue = parseInt(value);
      if (numValue >= 1 && numValue <= 10) {
        setColumns(numValue);
      }
    }
  };

  const renderMatrix = (matrix, title, colorTheme = 'primary') => {
    if (!matrix) return null;

    const colorMap = {
      primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
      success: { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20' },
      error: { main: '#d32f2f', light: '#f44336', dark: '#c62828' },
      warning: { main: '#ed6c02', light: '#ff9800', dark: '#e65100' }
    };

    const colors = colorMap[colorTheme];

    return (
      <Card 
        elevation={8}
        sx={{ 
          height: '100%',
          width: '100%',
          background: `linear-gradient(145deg, ${colors.main}08, ${colors.main}15)`,
          border: `2px solid ${colors.main}40`,
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 40px ${colors.main}25`,
            borderColor: `${colors.main}60`
          }
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              color: colors.main,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minHeight: '32px'
            }}
          >
            {title.includes('sum') && '➕'}
            {title.includes('multiplication') && '✖️'}
            {title.includes('After') && '🎯'}
            {title}
          </Typography>
          
          <TableContainer 
            component={Paper} 
            elevation={0}
            sx={{ 
              backgroundColor: 'transparent',
              border: `1px solid ${colors.main}30`,
              borderRadius: 2,
              overflow: 'hidden',
              flexGrow: 1
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: `${colors.main}20` }}>
                  <TableCell 
                    sx={{ 
                      color: colors.dark, 
                      fontWeight: 700,
                      width: '40px',
                      textAlign: 'center',
                      border: `1px solid ${colors.main}30`,
                      padding: '8px 4px'
                    }}
                  />
                  {Array.from({ length: columns }, (_, j) => (
                    <TableCell 
                      key={j} 
                      align="center" 
                      sx={{ 
                        color: colors.dark, 
                        fontWeight: 700,
                        width: '40px',
                        border: `1px solid ${colors.main}30`,
                        padding: '8px 4px'
                      }}
                    >
                      {j}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {matrix.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell 
                      sx={{ 
                        color: colors.dark, 
                        fontWeight: 700,
                        textAlign: 'center',
                        backgroundColor: `${colors.main}15`,
                        border: `1px solid ${colors.main}30`,
                        padding: '8px 4px'
                      }}
                    >
                      {i}
                    </TableCell>
                    {row.map((cell, j) => (
                      <TableCell 
                        key={j} 
                        align="center" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          border: `1px solid ${colors.main}20`,
                          backgroundColor: title.includes('After') ? `${colors.main}08` : 'transparent',
                          transition: 'all 0.2s ease',
                          padding: '8px 4px',
                          '&:hover': {
                            backgroundColor: `${colors.main}15`,
                            transform: 'scale(1.05)'
                          }
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography 
            variant="caption" 
            sx={{ 
              color: colors.main, 
              mt: 2, 
              display: 'block',
              fontStyle: 'italic',
              opacity: 0.8,
              minHeight: '24px'
            }}
          >
            {title.includes('sum') && 'cell = sum of index (i+j)'}
            {title.includes('multiplication') && 'cell = multiplication of index (i*j)'}
            {title.includes('After') && 'Result of matrix addition'}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 75%, #3a3a3a 100%)',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background:' #125f8fff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Matrix Calculator
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 400,
              mb: 3
            }}
          >
            Generate and add matrices with index-based calculations
          </Typography>
        </Box>

        {/* Controls */}
        <Card
          elevation={12}
          sx={{
            mb: 6,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={3}
              flexWrap="wrap"
            >
              <TextField
                label="Rows"
                type="number"
                value={rows}
                onChange={handleRowChange}
               
                size="medium"
                sx={{
                  width: 120,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                }}
              />

              <TextField
                label="Columns"
                type="number"
                value={columns}
                onChange={handleColumnChange}
              
                size="medium"
                sx={{
                  width: 120,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={generateMatrices}
                disabled={isGenerating}
                startIcon={isGenerating ? <CircularProgress size={20} /> : <CalculateIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: '#125f8fff',
                 
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb, hsla(195, 71%, 25%, 1.00))',
                    transform: 'translateY(2px)',
                   
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              >
                {isGenerating ? 'Generating...' : 'GENERATE MATRICES'}
              </Button>

              {matrices.sum && matrices.product && (
                <Tooltip title="Reset all matrices">
                  <IconButton
                    onClick={resetCalculator}
                    sx={{
                      color: '#ef4444',
                      border: '2px solid #ef4444',
                      '&:hover': {
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Matrices Display */}
        {matrices.sum && matrices.product && (
          <Fade in={true} timeout={800}>
            <Box>
              {/* Matrix equation layout: Green + Red = Orange */}
              <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
                {/* Green Matrix (Sum) */}
                <Box sx={{ width: { xs: '100%', md: '300px' }, maxWidth: '300px' }}>
                  {renderMatrix(matrices.sum, 'cell = sum of index (i+j)', 'success')}
                </Box>

                {/* Plus Symbol */}
                <Typography variant="h1" sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  color: 'transparent',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                  animation: 'pulse 2s infinite',
                  mx: { xs: 2, md: 3 }
                }}>+</Typography>

                {/* Red Matrix */}
                <Box sx={{ width: { xs: '100%', md: '300px' }, maxWidth: '300px' }}>
                  {renderMatrix(matrices.product, 'cell = multiplication of index (i*j)', 'error')}
                </Box>

                {/* Equals Symbol */}
                <Typography variant="h1" sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  color: 'transparent',
                 backgroundColor: '#8b5cf6',
                  WebkitBackgroundClip: 'text',
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                  mx: { xs: 2, md: 3 }
                }}>=</Typography>

                {/* Orange Matrix (Result) */}
                <Box sx={{ width: { xs: '100%', md: '300px' }, maxWidth: '300px', height:'340px' }}>
                  {renderMatrix(
                    matrices.result || Array.from({ length: rows }, () =>
                      Array(columns).fill('-')
                    ),
                    ' Result = Sum of Matrix',
                    'primary'
                  )}
                </Box>
              </Box>

              {/* Add Matrix Button */}
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={addMatrices}
                  disabled={showResult || isAdding}
                  startIcon={isAdding ? <CircularProgress size={20} /> : <AddIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: showResult
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, rgba(28, 121, 202, 1),rgba(28, 121, 202, 1))',
                    boxShadow: showResult
                      ? '0 8px 32px rgba(16, 185, 129, 0.3)'
                      : '0 8px 32px rgba(139, 92, 246, 0.3)',
                    '&:hover': {
                      transform: showResult || isAdding ? 'none' : 'translateY(-2px)',
                      boxShadow: showResult || isAdding
                        ? undefined
                        : '0 12px 40px rgba(139, 92, 246, 0.4)'
                    },
                    '&:disabled': {
                      background: showResult
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }
                  }}
                >
                  {isAdding ? 'Adding...' : showResult ? '✓ COMPLETED' : 'ADD MATRIX'}
                </Button>
              </Box>

              {/* Success Alert */}
              {showResult && (
                <Box mt={4}>
                  <Fade in={showResult} timeout={500}>
                    <Alert
                      severity="success"
                      icon={<SparkleIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: 'white',
                        '& .MuiAlert-icon': { color: '#10b981' }
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                       Matrix Addition Complete!
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                        Sum of both matrices calculated successfully
                      </Typography>
                    </Alert>
                  </Fade>
                </Box>
              )}
            </Box>
          </Fade>
        )}
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </Box>
  );
};

export default MatrixCalculator;